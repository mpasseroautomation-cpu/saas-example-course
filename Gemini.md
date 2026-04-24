# ContentFlow SaaS - Project State & Documentation

This document serves as the "brain" and hand-off guide for future AI models or developers working on the **ContentFlow SaaS** project. It encapsulates the core objectives, the technical stack, the architectural decisions, and a roadmap of what has been accomplished so far.

---

## 🚀 Project Overview
**ContentFlow** is a premium, client-facing SaaS dashboard for a content writing business. Clients sign in to track their pending content orders, create new orders via a simple form, and manage account settings.
- **Users:** Client-only. No admin/writer side in this app.
- **Aesthetic Goal:** High-end, "Apple/Dribbble" quality bar. The design uses a "Slick Security" inspired theme featuring a persistently dark sidebar with bright green accents (`#22c55e`) and a clean, light-mode main content area.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router, Server Components)
- **Styling:** Tailwind CSS v4 (No `tailwind.config.ts` — configured entirely via CSS variables in `app/globals.css`)
- **UI Components:** `shadcn/ui` (Radix Primitives)
- **State Management:** Zustand (for UI settings) & Supabase (for backend data)
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security)
- **Forms:** `react-hook-form` with `@hookform/resolvers/zod`
- **Validation:** `zod`
- **Notifications:** `sonner`
- **Theming:** `next-themes`

---

## 📂 Project Structure
```text
/app
  /(app)           # Protected dashboard routes (Dashboard, Orders, Settings, Help)
  /(marketing)     # Public routes (Landing page stub)
  /globals.css     # Global styles & Tailwind v4 token configurations
/components
  /app             # Domain-specific components (Sidebar, Topbar, StatCard, OrderTimeline, etc)
  /ui              # Reusable shadcn components (Button, Input, Card, Table, etc)
  client-only.tsx  # Wrapper utility to prevent Next.js SSR hydration mismatches
/lib
  /supabase        # Supabase client, server, and middleware utilities
  /store           # Zustand local state stores (settings.ts)
  /validators      # Zod validation schemas (order.ts)
  mock-data.ts     # Initial seed data types and fallbacks
```

---

## ✅ Current Progress

We are following a strict 5-Phase rollout. **Phase 1 and Phase 2 are completely finished.**

### Phase 1: Signed-in App Shell (Completed)
- Scaffolded Next.js 15 app with Tailwind v4.
- Implemented the exact dark/green visual aesthetic via `globals.css` overrides.
- Built static UI pages with mock data for Dashboard, Orders List, Order Detail, New Order Form, Help, and Settings.
- Resolved all Next.js Client/Server boundary layout bugs.

### Phase 2: Interactive with Local Data (Completed)
- Hooked the UI up to a browser-persisted `Zustand` store.
- **New Order Form:** Fully validated with Zod, disables submit until valid, creates order in state, fires Sonner toast, and redirects to Order Detail page.
- **Orders Table:** Implemented client-side text searching (by title) and filtering (by status), plus column sorting.
- **Settings:** Profile, Notifications, and Appearance (Next-Themes) are fully wired up to read/write state locally.
- **Hydration Fixes:** Wrapped dynamic state-dependent pages in a custom `<ClientOnly>` component to eliminate React hydration mismatch errors.
- **Next.js 15 Fix:** Updated dynamic routes (e.g., `/orders/[id]`) to properly unwrap the `params` promise using `React.use()`.

### Phase 3: Supabase Auth + Database (Completed)
- **Database:** Created `orders` and `order_events` tables in PostgreSQL, replacing `lib/mock-data.ts`.
- **Authentication:** Integrated `@supabase/ssr`. Added a custom Login/Signup page (`/login`).
- **Security (RLS):** Implemented Row Level Security to ensure clients can only view and create their own orders.
- **Server Actions:** Replaced Zustand data mutations with Next.js Server Actions (`app/actions/orders.ts`, `app/actions/auth.ts`).
- **Middleware Protection:** Added Next.js Middleware to protect all `/(app)` routes and redirect unauthenticated users to `/login`.
- **Refined UX:** Changed the topbar to have a direct link to Profile Settings instead of a dropdown, and placed a native "Sign out" button inside the Profile page. Updated the app to default to Dark Mode.
- **Password Management:** Hooked up the `updatePassword` functionality natively to Supabase inside `Settings -> Security`.

### Phase 4: Dashboard Vibe Coding & Marketing Site (Completed)
- **Aesthetic Overhaul:** Fully transitioned the dashboard from a basic layout to a highly premium, animated, and colorful "DashMark" inspired vibe using OKLCH colors, interactive hover states, and glassmorphism.
- **Data Cleanup:** Stripped out all hardcoded mock data on the dashboard (dummy team members, fake tasks) and replaced them with dynamic metrics derived directly from the Supabase `orders` table (e.g., Content Volume, Active Orders).
- **Landing Page (`/`):** Developed a stunning marketing page featuring a full-bleed looping video background (`bg-animation.mp4`), a detailed "Platform" workflow, "FAQ", and transparent "Pricing" tiers.
- **Auth Separation:** Split the single auth form into dedicated `/login` and `/signup` pages, both inheriting the premium video background aesthetic.
- **Middleware Update:** Commented out the auth route redirect in `middleware.ts` to allow previewing the login/signup pages even when authenticated.

---

## ⏭ Next Steps & Instructions for the Model

### Upcoming Phase: Phase 5 — Admin/Writer Portal OR Stripe Payments
Now that the core client experience and backend are finished, the next steps could go in two directions:
1. **Admin Portal:** Create a separate route group (e.g., `/(admin)`) where the business owner can log in, view all incoming orders from all users, and update their statuses (which will create new `order_events`).
2. **Stripe Payments:** Integrate Stripe Checkout so users have to pay before an order is officially "submitted" to the system.

### Critical Rules for Future Models:
1. **Next.js 15 Constraints:** 
   - `params` and `searchParams` in layout/page props are **Promises**. They *must* be unwrapped using `React.use()` before destructuring.
2. **Tailwind v4 Constraints:** 
   - Do NOT try to create or modify a `tailwind.config.ts` or `tailwind.config.js`. Tailwind v4 does everything in `app/globals.css` using the `@theme` directive.
3. **Hydration Mismatches:**
   - When dealing with `localStorage` (via Zustand or Next-Themes), use the `<ClientOnly>` wrapper or `useEffect` mounting techniques. SSR renders will not match the client's local storage state.
4. **Design Quality:**
   - Maintain the premium feel. Do not revert to default Shadcn styling. The deep dark sidebar (`var(--sidebar)`) and the primary green accents must be preserved. Use `Button` and other components purposefully.
