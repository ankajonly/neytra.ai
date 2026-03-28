# Neytr.ai Website Foundation

Modern MERN foundation for a premium agency website with a scalable React frontend, Express API, MongoDB integration, JWT auth, Google OAuth scaffolding, Docker support, and CI/CD.

## Stack

- React + Vite + Tailwind CSS
- Node.js + Express.js
- MongoDB + Mongoose
- JWT auth + Passport Google OAuth
- GSAP + Framer Motion + Swiper
- Docker + GitHub Actions

## Project Structure

```text
client/   React app, design system, routes, auth state, pages, services
server/   Express API, config, models, controllers, validators, middleware
```

## Quick Start

1. Copy `client/.env.example` to `client/.env`.
2. Copy `server/.env.example` to `server/.env`.
3. Install dependencies with `npm install`.
4. Run the stack with `npm run dev`.

## Scripts

- `npm run dev` starts client and server together.
- `npm run build` builds both workspaces.
- `npm run lint` lints both workspaces.
- `npm run docker:up` starts the Dockerized stack.

## Notes

- The OAuth flow is scaffolded for Google and can be extended to other providers.
- Email verification and OTP hooks are prepared through the server service layer.
- The frontend routing and layout system is designed to expand into blog, dashboard, CRM, and portal modules.