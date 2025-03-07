<script setup lang="ts">
import { useAuthStore } from './store/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const errorParam = ref<string | null>(null)

// get current query params
const urlParams = new URLSearchParams(window.location.search)
console.log(urlParams)
const error = urlParams.get('error')
const isLoginRedirect = urlParams.get('login_redirect') === 'true'
const isLoggedOutRedirect = urlParams.get('logged_out') === 'true'
if (error) {
  errorParam.value = error
  console.error('Error logging in:', error)
}

if (!isLoginRedirect) {
  authStore.login().catch((err) => {
    console.error('Error logging in:', err)
  })
}


</script>

<template>
  <div>
    <div v-if="authStore.isLoggedIn">
      <pre style="text-align: left;">
        <code>{{ JSON.stringify(authStore.user, null, 2).trim() }}</code>
      </pre>
    </div>
    <div v-else-if="errorParam">
      <p>Error occurred</p>
    </div>
    <div v-else-if="isLoggedOutRedirect">
      <p>Logged out</p>
    </div>
    <div v-else>
      Logging in...
      <!-- <button @click="login">Login</button> -->
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
