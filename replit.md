# replit.md

## Overview

This is a **Student Directory** web application — a full-stack CRUD app for managing student records (name, father's name, email, grade). Users can view a searchable list of students and add new ones through a modal form. The stack is a monorepo with a React frontend and Express backend, connected to a PostgreSQL database via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure

The project follows a three-directory monorepo pattern:

- **`client/`** — React SPA (Single Page Application)
- **`server/`** — Express API server
- **`shared/`** — Code shared between client and server (schema, route definitions)

### Frontend (`client/src/`)

- **Framework:** React with TypeScript
- **Routing:** Wouter (lightweight client-side router)
- **State/Data Fetching:** TanStack React Query for server state management
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Forms:** react-hook-form with Zod validation via @hookform/resolvers
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Build Tool:** Vite with path aliases (`@/` → `client/src/`, `@shared/` → `shared/`)

Key patterns:
- Custom hooks in `client/src/hooks/` encapsulate data fetching logic (`use-students.ts`)
- The `queryClient.ts` provides a centralized API request helper and default query configuration
- Components use the shared schema for type safety and validation

### Backend (`server/`)

- **Framework:** Express 5 on Node.js
- **Language:** TypeScript, run with `tsx` in development
- **API Pattern:** RESTful JSON API under `/api/` prefix
- **Route Definitions:** Centralized in `shared/routes.ts` — both client and server reference the same route paths and validation schemas
- **Storage Layer:** `server/storage.ts` defines an `IStorage` interface with a `DatabaseStorage` implementation, making it easy to swap storage backends

Key files:
- `server/index.ts` — App entry point, sets up Express middleware and logging
- `server/routes.ts` — Registers API route handlers
- `server/storage.ts` — Database access layer (repository pattern)
- `server/vite.ts` — Dev server setup (Vite middleware for HMR)
- `server/static.ts` — Production static file serving

### Shared Code (`shared/`)

- **`schema.ts`** — Drizzle ORM table definitions and Zod insert schemas. The `students` table has: id (serial), name, fatherName, email, grade, createdAt
- **`routes.ts`** — API contract definitions with paths, methods, input schemas, and response schemas. Used by both frontend (for type-safe fetching) and backend (for validation)

### Database

- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Driver:** `pg` (node-postgres) with connection pooling
- **Schema Management:** `drizzle-kit push` for schema sync (no migration files needed for dev)
- **Config:** `drizzle.config.ts` reads `DATABASE_URL` from environment
- **Session Store:** `connect-pg-simple` is available (listed in dependencies)

### Build & Development

- **Dev:** `npm run dev` — runs `tsx server/index.ts` with Vite middleware for HMR
- **Build:** `npm run build` — Vite builds the client, esbuild bundles the server into `dist/index.cjs`
- **Start:** `npm start` — runs the production bundle
- **DB Push:** `npm run db:push` — pushes schema to database via drizzle-kit

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/students` | List all students |
| GET | `/api/students/:id` | Get a single student |
| POST | `/api/students` | Create a new student |

All endpoints use Zod validation from the shared schema. Errors return structured JSON with message and optional field info.

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable. Must be provisioned before the app can run.
- **Google Fonts** — Inter, Space Grotesk, DM Sans, Fira Code, Geist Mono, and Architects Daughter loaded via CDN
- **Replit Plugins** — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, and `@replit/vite-plugin-dev-banner` for development experience on Replit (conditionally loaded)

No external authentication service is currently configured. No third-party APIs beyond the database are actively used, though dependencies for OpenAI, Stripe, Nodemailer, and Google Generative AI exist in the build allowlist for potential future use.