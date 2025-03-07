import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Keycloak from 'keycloak-js'
import { authentication, createDirectus, readMe, readUser, refresh, rest, staticToken, type DirectusClient } from '@directus/sdk'
import axios from 'axios'

interface SsoUserData {
  id?: string
  email?: string
  name?: string
  preferred_username?: string
  [key: string]: any
}



// Initialize Keycloak with PKCE
const keycloak = new Keycloak({
  url: import.meta.env.VITE_APP_KEYCLOAK_URL,
  realm: 'master',
  clientId: 'idp-broker-demo'
})

function createDirectusClient(token: string) {
  return createDirectus(import.meta.env.VITE_APP_DIRECTUS_URL)
    .with(rest())
    .with(staticToken(token))
}

// Create a silent check SSO HTML file path
const silentCheckSsoPath = `${window.location.origin}/silent-check-sso.html`;

// Initialize Keycloak with PKCE and silent SSO check
const keycloakInitPromise = keycloak.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: silentCheckSsoPath,
  pkceMethod: 'S256', // Enable PKCE with SHA256
  enableLogging: true, // Enable logging for debugging
  flow: 'standard', // Use standard flow instead of implicit to avoid CORS issues
  responseMode: 'query', // Use query response mode for PKCE
}).catch((error) => {
  console.error('Keycloak initialization failed:', error)
  return false
})

export const useAuthStore = defineStore('authStore', () => {

  const ssoUser = ref<SsoUserData | null>(null)
  const isKeycloakInitialized = ref(false)
  const directusToken = ref<{ accessToken: string, refreshToken: string, expires: number, id: string } | null>(null)
  let directusClient: ReturnType<typeof createDirectusClient> | null = null
  const currentUser = ref<Record<string, any> | null>(null)


  // Initialize Keycloak
  keycloakInitPromise
    .then((authenticated) => {
      console.debug('Keycloak initialized:', authenticated)
      isKeycloakInitialized.value = true

      if (authenticated) {
        ssoUser.value = {
          id: keycloak.tokenParsed?.sub,
          email: keycloak.tokenParsed?.email,
          name: keycloak.tokenParsed?.name,
          preferred_username: keycloak.tokenParsed?.preferred_username
        }
        // Get Directus token after successful Keycloak authentication
        void onLoginSuccess()
      }

      // Set up token refresh
      setupTokenRefresh()
    })
    .catch((error) => {
      console.error('Keycloak initialization failed:', error)
    })

  // Setup token refresh before it expires
  function setupTokenRefresh (): void {
    if (keycloak.authenticated === true) {
      // Refresh token 10 seconds before it expires
      const tokenParsed = keycloak.tokenParsed
      if (tokenParsed?.exp == null || tokenParsed?.iat == null) {
        console.error('Token information is missing')
        return
      }

      const refreshTime = (tokenParsed.exp - tokenParsed.iat - 10) * 1000
      setTimeout(() => {
        void keycloak.updateToken(70)
          .then((refreshed) => {
            if (refreshed) {
              console.debug('Token refreshed')
              // Update Directus token when Keycloak token is refreshed
              void onLoginSuccess()
            }
            setupTokenRefresh()
          })
          .catch(() => {
            console.error('Failed to refresh token')
            void logout()
          })
      }, refreshTime)
    }
  }

  // Get Directus token using Keycloak token
  async function onLoginSuccess (): Promise<any> {
    try {
      if (keycloak.token == null) {
        throw new Error('No Keycloak token available')
      }
      console.trace('Keycloak token:', keycloak.token)

      const response = await axios.post(`${import.meta.env.VITE_APP_DIRECTUS_URL}/token-exchange`, {
        token: keycloak.token
      },{
        headers: {
          'Content-Type': 'application/json',
        }
      })
      directusToken.value = response.data

      directusClient = createDirectusClient(response.data.accessToken)

      const me = await directusClient.request(readMe())
      currentUser.value = me.data

      // return data
    } catch (error) {
      console.error('Failed to get Directus token:', error)
      throw error
    }
  }

  // Login function - initiates silent Keycloak login with PKCE
  async function login (): Promise<any> {
    if (!isKeycloakInitialized.value) {
      await keycloakInitPromise
    }

    if (keycloak.authenticated === true) {
      return await onLoginSuccess()
    }
    
    try {
      // Try silent login first
      const authenticated = await keycloak.login({
        idpHint: 'oidc-idp-demo',
        redirectUri: `${window.location.origin}?login_redirect=true`,
      }).catch(() => false)
      
      if (authenticated) {
        return await onLoginSuccess()
      } else {
        // If silent login fails, we can either:
        // 1. Return a failure that the UI can handle
        // 2. Fall back to a redirect login if silent fails
        console.debug('Silent login failed, user may need to login explicitly')
        return { success: false, message: 'Silent login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error }
    }
  }


  // Logout function
  async function logout (): Promise<void> {
    try {
      ssoUser.value = null
      currentUser.value = null
      directusToken.value = null
      keycloak.logout({
        redirectUri: `${window.location.origin}?logged_out=true`
      })

    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // this will be inside an iframed page.
  // if it receives logout message, it will call the logout function
  window.addEventListener('message', (event) => {
    const data = event.data
    console.log('Received message:', data)
    
    if (data == null || data.context !== 'sourcesync') { return }
    if (data.event === 'logout') {
      void logout()
    }
  })

  const isLoggedIn = computed(() => directusToken.value !== null && currentUser.value !== null)

  // Get current user
  function getSsoUser (): SsoUserData | null {
    return ssoUser.value
  }

  return {
    login,
    logout,
    isLoggedIn,
    getSsoUser,
    user: ssoUser,
    directusToken,
    getDirectusClient: () => directusClient
  }
})
