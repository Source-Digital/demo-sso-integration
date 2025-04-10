# Auth0 Demo SPA

This project demonstrates a Vue.js Single Page Application (SPA) with Auth0 integration for authentication and authorization.

## Features

- Logging in to Auth0 using Redirect Mode
- Accessing profile information from the ID token
- Protected routes (the `/profile` route requires authentication)
- Integration with a child frame for additional SSO capabilities

## Project Structure

```
auth0-demo-spa/
├── src/
│   ├── components/       # Vue components
│   │   ├── Error.vue     # Error display component
│   │   ├── Hero.vue      # Hero section component
│   │   ├── HomeContent.vue # Home page content
│   │   └── NavBar.vue    # Navigation bar with login/logout
│   ├── views/
│   │   ├── Home.vue      # Home page view
│   │   └── Profile.vue   # Protected profile page
│   ├── router/
│   │   └── index.ts      # Vue Router configuration
│   ├── App.vue           # Main application component
│   └── main.ts           # Application entry point
├── auth_config.json      # Auth0 configuration
└── package.json          # Package dependencies
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

### Auth0 Configuration

The project requires Auth0 configuration to enable authentication. Create or edit `auth_config.json` with your Auth0 credentials:

```json
{
  "domain": "<YOUR AUTH0 DOMAIN>",
  "clientId": "<YOUR AUTH0 CLIENT ID>"
}
```

You'll need to set up an Auth0 application with the following settings:
- Application Type: Single Page Application
- Allowed Callback URLs: http://localhost:3000
- Allowed Logout URLs: http://localhost:3000
- Allowed Web Origins: http://localhost:3000

### Development Server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm run dev
```

This will start the development server at http://localhost:3000.

## Integration with Child Frame

This SPA integrates with a child frame (`auth0-child-frame`) that runs in an iframe on the profile page. The child frame handles Keycloak authentication and communicates with the main SPA using the postMessage API.

Key integration points:
- The Profile.vue component includes an iframe pointing to the child frame
- The NavBar.vue component sends logout messages to the child frame
- Both applications synchronize their authentication state

## Building for Production

```bash
# Using npm
npm run build

# Using pnpm
pnpm run build
```

### Docker Deployment

To build and run the Docker image:
- On Linux/macOS: `./exec.sh`
- On Windows: `.\exec.ps1`

## Additional Resources

- [Auth0 Documentation](https://auth0.com/docs)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [Vue Router Documentation](https://router.vuejs.org/)

## License

This project is licensed under the MIT license.
