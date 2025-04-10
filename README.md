# Auth0 SSO Integration Demo

This monorepo demonstrates a comprehensive Single Sign-On (SSO) integration using multiple identity providers (Auth0 and Keycloak) with token exchange to a headless CMS (Directus).

## Project Structure

This project is organized as a monorepo with two main packages:

```
demo-sso-integration/
├── packages/
│   ├── auth0-demo-spa/           # Main SPA with Auth0 integration
│   └── auth0-child-frame/        # Child frame with Keycloak integration
├── package.json                  # Root package.json
└── pnpm-workspace.yaml           # PNPM workspace configuration
```

## Packages

### auth0-demo-spa

A Vue.js Single Page Application that demonstrates Auth0 integration for authentication and authorization. It includes protected routes and user profile display.

[View auth0-demo-spa README](./packages/auth0-demo-spa/README.md)

### auth0-child-frame

A Vue.js application designed to run in an iframe within the main SPA. It handles Keycloak authentication and token exchange with Directus.

[View auth0-child-frame README](./packages/auth0-child-frame/README.md)

## Key Features

- Multi-provider SSO integration (Auth0 and Keycloak)
- Token exchange with Directus headless CMS
- Cross-frame communication using postMessage
- Silent authentication with refresh token handling
- Protected routes and user profile display

## Getting Started

### Prerequisites

- Node.js (v14+)
- pnpm (v7.33.1+ or v8.5.1+)

### Installation

```bash
# Install dependencies for all packages
pnpm install
```

### Configuration

Each package requires specific configuration:

1. **auth0-demo-spa**: Configure Auth0 credentials in `auth_config.json`
2. **auth0-child-frame**: Set up environment variables for Keycloak and Directus

See the individual package READMEs for detailed configuration instructions.

### Development

Start both applications in development mode:

```bash
# Start auth0-demo-spa (default port: 3000)
cd packages/auth0-demo-spa
pnpm run dev

# In another terminal, start auth0-child-frame (default port: 3100)
cd packages/auth0-child-frame
pnpm run dev
```

## Authentication Flow

1. User logs in to the main SPA using Auth0
2. The profile page loads with an iframe containing the child frame application
3. The child frame silently authenticates with Keycloak
4. The child frame exchanges the Keycloak token for a Directus token
5. Both applications maintain synchronized authentication states
6. Logout is synchronized between both applications

## License

This project is licensed under the MIT license.
