# Nebula Ops — SaaS Admin Dashboard

A production-style **admin control plane** built with **Next.js 14** (App Router), **TypeScript**, and a modern UI stack. It includes mock authentication, KPI analytics, interactive charts, role-based access, and a full-featured user directory with search, filters, pagination, and CSV export.

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available scripts](#available-scripts)
- [Authentication & demo accounts](#authentication--demo-accounts)
- [Deployment](#deployment)
- [Security note](#security-note)
- [License](#license)

---

## Overview

**Nebula Ops** is a dark, glassmorphism-inspired dashboard aimed at SaaS operations: revenue and growth metrics, sales trends, category mix, and team management. The UI uses **ShadCN UI** (with Base UI primitives), **Tailwind CSS**, **Framer Motion** for motion, **Recharts** for data visualization, **TanStack Table** for the user grid, and **Zustand** for client state (with persistence where useful).

Authentication is **intentionally simple**: API routes validate credentials against demo users (and signups), then issue an **httpOnly cookie** containing a signed session payload. **Next.js middleware** protects authenticated routes and syncs with the client via `/api/auth/me` and a small **AuthProvider** that hydrates Zustand.

This repository is suitable as a **portfolio piece**, **internal demo**, or **starting point** for a real product—swap mock auth for your provider (Auth.js, Clerk, Supabase Auth, etc.) when you go to production.

---

## Features

| Area | Description |
|------|-------------|
| **Auth** | Login and signup pages; session cookie; logout clears cookie and client state. |
| **Dashboard** | KPI cards (users, revenue, growth), line/area chart (sales vs forecast), bar chart (category mix). Charts load client-only to avoid SSR layout issues. |
| **User management** | Sortable table: name, email, role, status; global search; filters for role and status; pagination. |
| **Role-based access** | **Admin**: full navigation, user directory, CSV export. **User**: overview; restricted “Team & users” entry; direct URL to `/users` shows an access-denied state. |
| **Export** | Export **filtered** table rows to CSV (admins only). |
| **UI/UX** | Dark theme, sidebar + responsive sheet menu, glass-style cards, hover states, page transitions, staggered section animations. |

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Components | [ShadCN UI](https://ui.shadcn.com/) / [Base UI](https://base-ui.com/) |
| Tables | [@tanstack/react-table](https://tanstack.com/table) |
| Charts | [Recharts](https://recharts.org/) |
| State | [Zustand](https://zustand-demo.pmnd.rs/) (with `persist` for auth and extra users) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |

---

## Project structure

```
saas-admin-dashboard/
├── src/
│   ├── app/
│   │   ├── (app)/                 # Authenticated shell (sidebar layout)
│   │   │   ├── dashboard/         # Overview + charts
│   │   │   └── users/             # User directory
│   │   ├── (auth)/                # Login / signup layouts
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── api/auth/              # login, signup, logout, me
│   │   ├── globals.css            # Theme tokens, glass utilities
│   │   ├── layout.tsx             # Root layout, fonts, AuthProvider
│   │   └── page.tsx               # Redirects to /dashboard
│   ├── components/
│   │   ├── layout/                # Sidebar, header, page transition
│   │   └── ui/                    # ShadCN primitives (button, card, table, …)
│   ├── features/
│   │   ├── auth/                  # Login & signup forms
│   │   ├── dashboard/             # KPIs, charts, role banner
│   │   └── users/                 # Table, RBAC gate, access denied
│   ├── hooks/
│   │   └── use-auth.ts            # Convenience hook around auth store
│   ├── lib/
│   │   ├── auth-constants.ts      # Cookie name
│   │   ├── csv.ts                 # CSV generation & download
│   │   ├── mock-data.ts           # Demo KPIs, chart series, users seed
│   │   ├── rbac.ts                # canAccessUsers, canExport
│   │   ├── session.ts             # Encode/decode session (Node/API routes)
│   │   ├── session-edge.ts        # Decode session in Edge middleware
│   │   └── utils.ts               # `cn()` helper
│   ├── providers/
│   │   └── auth-provider.tsx      # Fetches /api/auth/me on mount
│   ├── stores/
│   │   ├── auth-store.ts          # Current user (persisted)
│   │   └── users-store.ts         # Extra users from signup (merged with mock list)
│   ├── types/
│   │   └── index.ts               # User, Role, SessionPayload
│   └── middleware.ts              # Route protection & auth redirects
├── public/                        # Static assets (if any)
├── components.json                # ShadCN configuration
├── tailwind.config.ts
├── next.config.* 
├── package.json
└── README.md
```

---

## Architecture

### Routing

- **`/`** → redirects to **`/dashboard`**.
- **`/login`**, **`/signup`** → public; middleware redirects to **`/dashboard`** if a valid session cookie exists.
- **`/dashboard`**, **`/users`** → require a valid session; otherwise redirect to **`/login`** with optional `?from=` return path.

### Session

- API routes (`login`, `signup`) set an **httpOnly** cookie (`saas-auth`) with a **base64url**-encoded JSON payload (includes expiry).
- **Middleware** uses **Edge-safe** decoding (`session-edge.ts`) to avoid Node `Buffer` in the Edge runtime.
- **`GET /api/auth/me`** reads the cookie with `cookies()` and returns the current user for the **AuthProvider** / Zustand sync.

### Data

- KPI and chart data live in **`src/lib/mock-data.ts`** (static demo numbers).
- The user table merges **`MOCK_USERS`** with **`users-store`** `extra` entries (e.g. new signups stored in `localStorage`).

---

## Prerequisites

- **Node.js** 18.x or **20.x** (LTS recommended)
- **npm** (comes with Node) — the project uses `package-lock.json` with npm

Optional:

- **Git** — to clone the repository
- **Vercel CLI** — if you deploy from the CLI (`npm i -g vercel`)

---

## Installation

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd saas-admin-dashboard
```

Use your Git remote URL (HTTPS or SSH). If you forked the project, point `git clone` at your fork.

### 2. Install dependencies

```bash
npm install
```

This installs all dependencies listed in `package.json`, including Next.js, React, Tailwind, TanStack Table, Recharts, Zustand, Framer Motion, and ShadCN-related packages.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should be redirected to `/login` until you sign in (or to `/dashboard` if a session cookie is already present).

### 4. Production build (local)

```bash
npm run build
npm run start
```

`build` creates an optimized production bundle under `.next/`. `start` serves it on port **3000** by default.

### 5. Lint

```bash
npm run lint
```

Runs ESLint with the Next.js config.

---

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js in development mode (hot reload). |
| `npm run build` | Create an optimized production build. |
| `npm run start` | Run the production server (run `build` first). |
| `npm run lint` | Run ESLint on the project. |

---

## Authentication & demo accounts

The login page shows demo hints. Built-in accounts:

| Role | Email | Password |
|------|--------|----------|
| **Admin** | `admin@acme.dev` | `admin123` |
| **User** | `user@acme.dev` | `user123` |

**Signup** creates a **user**-role account (subject to API validation) and can add a row to the merged user list via persisted store.

No `.env` file is required for the default mock auth. If you add real secrets later, use `.env.local` (ignored by Git) and never commit keys.

---

## Deployment

The app is a standard Next.js app and deploys cleanly to **[Vercel](https://vercel.com/)**:

1. Push the repo to GitHub (or GitLab / Bitbucket).
2. Import the repository in Vercel.
3. Use the default framework preset (**Next.js**), root directory = project root, build command `npm run build`, output = Next default.

Environment variables are optional for this demo. Connect your production domain in the Vercel project settings if needed.

**Reference deployment (example):** production URL may look like `https://<project>-<team>.vercel.app` after the first deploy.

---

## Security note

This project uses **demo authentication**: session data in a cookie is suitable for prototyping only. For real production use you should:

- Use a proven auth library or provider and secure session/JWT handling.
- Hash passwords and store users in a real database.
- Add CSRF protection, rate limiting, and HTTPS-only cookies as appropriate.

---

## License

This project is provided as-is for demonstration and learning. Add a `LICENSE` file if you redistribute with specific terms.
