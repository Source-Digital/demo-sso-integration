# Auth0 Child Frame

This project is a Vue.js application designed to run in an iframe within the main Auth0 Demo SPA. It handles Keycloak authentication and token exchange with Directus.

## Features

- Silent authentication with Keycloak
- Token exchange with Directus
- Cross-frame communication using postMessage
- Synchronized logout with the parent application

## Project Structure

```
auth0-child-frame/
├── public/
│   └── silent-check-sso.html  # Silent SSO check page for Keycloak
├── src/
│   ├── components/            # Vue components
│   ├── store/
│   │   └── auth.ts            # Pinia store for authentication
│   ├── App.vue                # Main application component
│   └── main.ts                # Application entry point
├── .env.template              # Template for environment variables
└── package.json               # Package dependencies
```

## Setup and Configuration

### Prerequisites

- Node.js (v14+)
- npm or pnpm

### Installation

```bash
# Using npm
npm install

# Using pnpm
pnpm install
```

### Environment Configuration

Create a `.env` file based on the `.env.template` with the following variables:

```
VITE_APP_KEYCLOAK_URL=<YOUR_KEYCLOAK_URL>
VITE_APP_KEYCLOAK_REALM=<YOUR_KEYCLOAK_REALM>
VITE_APP_KEYCLOAK_CLIENT_ID=<YOUR_KEYCLOAK_CLIENT_ID>
VITE_APP_DIRECTUS_URL=<YOUR_DIRECTUS_URL>
```

### Keycloak Configuration

You'll need to set up a Keycloak client with the following settings:
- Client ID: Match the value in your .env file
- Access Type: public
- Standard Flow Enabled: true
- Direct Access Grants Enabled: true
- Valid Redirect URIs: http://localhost:3100/*
- Web Origins: http://localhost:3100

### Development Server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm run dev
```

This will start the development server at http://localhost:3100.

## Authentication Flow

1. The application initializes Keycloak with PKCE (Proof Key for Code Exchange)
2. It performs a silent SSO check using the `silent-check-sso.html` page
3. If authentication is successful, it exchanges the Keycloak token for a Directus token
4. The application sets up token refresh before expiration
5. It listens for logout messages from the parent application

## Integration with Parent SPA

This application is designed to be embedded in an iframe within the main Auth0 Demo SPA. The integration points include:

- The parent SPA embeds this application in an iframe on the profile page
- This application displays the authenticated user's information
- The parent SPA sends logout messages to this application
- Both applications maintain synchronized authentication states

## Building for Production

```bash
# Using npm
npm run build

# Using pnpm
pnpm run build
```

## Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Directus Documentation](https://docs.directus.io/)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [Pinia Documentation](https://pinia.vuejs.org/)

## License

This project is licensed under the MIT license.
