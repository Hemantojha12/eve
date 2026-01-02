# e-ventA - Event Booking Platform

## Overview

e-ventA is a mobile-first event discovery and booking platform built with React and Express. Users can browse upcoming events, view event details, book tickets, and manage their bookings. The application features Replit Auth for authentication, PostgreSQL for data persistence, and a modern UI built with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, bundled with Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Design Approach**: Mobile-first with bottom navigation, touch-friendly targets (min 44px), and max-width container (max-w-md) for app-like experience

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints under `/api` prefix with Zod validation
- **Authentication**: Replit Auth integration using OpenID Connect with Passport.js
- **Session Management**: Express sessions stored in PostgreSQL via connect-pg-simple

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` for shared types between client and server
- **Tables**:
  - `users` - User accounts (managed by Replit Auth)
  - `sessions` - Session storage for authentication
  - `events` - Event listings with title, description, date, location, price, seats
  - `bookings` - User bookings linking users to events

### API Structure
Routes are defined in `shared/routes.ts` using a typed contract pattern:
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (authenticated)
- `GET /api/bookings` - List user's bookings (authenticated)
- `POST /api/bookings` - Create booking (authenticated)
- `GET /api/auth/user` - Get current authenticated user

### Build System
- **Development**: Vite dev server with HMR proxied through Express
- **Production**: Vite builds client to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Database Migrations**: Drizzle Kit with `db:push` command

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable

### Authentication
- **Replit Auth**: OpenID Connect provider for user authentication
- **Required Environment Variables**:
  - `DATABASE_URL` - PostgreSQL connection string
  - `SESSION_SECRET` - Secret for session encryption
  - `ISSUER_URL` - Replit OIDC issuer (defaults to https://replit.com/oidc)
  - `REPL_ID` - Replit environment identifier

### Key NPM Packages
- `drizzle-orm` / `drizzle-kit` - Database ORM and migrations
- `express` / `express-session` - Web server and sessions
- `passport` / `openid-client` - Authentication
- `@tanstack/react-query` - Data fetching and caching
- `wouter` - Client-side routing
- `zod` - Runtime validation
- `date-fns` - Date formatting
- `framer-motion` - Animations
- Radix UI primitives - Accessible UI components