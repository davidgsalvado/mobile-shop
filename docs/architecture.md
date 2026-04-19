# Architecture

## Overview

Mobile Shop is a **Single Page Application (SPA)** built with React 19 and TypeScript. It follows a feature-based folder structure with clear separation of concerns between API communication, state management, UI components, and routing.

There is no Server-Side Rendering (SSR); all routing is handled on the client via `react-router-dom`.

## High-Level Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser                               │
│                                                              │
│  ┌────────────┐   ┌──────────────┐   ┌────────────────────┐ │
│  │  React      │──▶│ React Router │──▶│ Pages              │ │
│  │  (entry)    │   │ (SPA routes) │   │  - ProductListPage │ │
│  └────────────┘   └──────────────┘   │  - ProductDetailPage│ │
│                                       │  - NotFoundPage     │ │
│                                       └────────┬───────────┘ │
│                                                │              │
│                   ┌────────────────────────────┼────────┐    │
│                   │          Hooks Layer        │        │    │
│                   │  useProducts, useAddToCart,  │        │    │
│                   │  useProductDetail,           │        │    │
│                   │  useProductSpecs             │        │    │
│                   └─────────┬──────────┬────────┘        │    │
│                             │          │                       │
│                  ┌──────────▼──┐  ┌────▼───────────┐          │
│                  │  API Layer  │  │  Zustand Stores │          │
│                  │  (fetch)    │  │  cartStore      │          │
│                  │             │  │  detailStore    │          │
│                  └──────┬─────┘  └────────┬────────┘          │
│                         │                 │                    │
│              ┌──────────▼─────────────────▼──────────┐        │
│              │  TanStack Query + localStorage cache   │        │
│              │  (1-hour staleTime + persistence)      │        │
│              └────────────────────────────────────────┘        │
│                         │                                      │
└─────────────────────────┼──────────────────────────────────────┘
                          │  HTTP (proxied by Vite in dev)
                          ▼
              ┌───────────────────────┐
              │  ITX Backend API      │
              │  /api/product         │
              │  /api/product/:id     │
              │  /api/cart            │
              └───────────────────────┘
```

## Folder Structure

```
src/
├── api/               # HTTP client functions (fetch wrappers)
│   ├── cartApi.ts
│   └── productApi.ts
├── components/
│   ├── layout/        # App shell: Header, Layout (Outlet)
│   ├── product/       # Domain components: ProductCard, ProductGrid
│   └── ui/            # shadcn/ui primitives (Badge, Button, Card, Input, Breadcrumb)
├── hooks/             # Custom React hooks wrapping TanStack Query / business logic
│   ├── useAddToCart.ts
│   ├── useProductDetail.ts
│   ├── useProducts.ts
│   └── useProductSpecs.ts
├── lib/               # General utilities (cn helper for Tailwind class merging)
├── pages/             # Route-level page components
│   ├── NotFoundPage.tsx
│   ├── ProductDetailPage.tsx
│   └── ProductListPage.tsx
├── router/            # Route definitions (createBrowserRouter)
├── store/             # Zustand stores for global client state
│   ├── cartStore.ts
│   └── detailStore.ts
├── types/             # TypeScript interfaces and type definitions
│   ├── cart.ts
│   ├── detail.ts
│   └── product.ts
└── utils/             # Shared utility functions
    ├── queryClient.ts # TanStack Query client + localStorage persister
    └── validation.ts  # isValid() helper for handling API null/empty values
```

## Key Architectural Decisions

### 1. Data Fetching — TanStack React Query

All API calls are managed through TanStack React Query (`@tanstack/react-query`). Each query is encapsulated in a custom hook (`useProducts`, `useProductDetail`). Mutations (add to cart) use `useMutation`.

**Caching strategy**: queries have a `staleTime` (how long fetched data is considered "fresh") and `gcTime` (how long inactive query data stays in the in-memory cache after all its observers unmount) of **1 hour** (as required). The cache is also persisted to `localStorage` via `@tanstack/query-async-storage-persister`, so data survives page refreshes within the 1-hour window.

### 2. Client State — Zustand

Two Zustand stores manage non-server state:

| Store | Purpose | Persistence |
|-------|---------|-------------|
| `cartStore` | Cart item count (from API response) | `localStorage` via `zustand/persist` |
| `detailStore` | Current product page title (for breadcrumbs) | `localStorage` via `zustand/persist` |

### 3. Routing — React Router v7

The app uses `createBrowserRouter` with a nested route layout:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `ProductListPage` | Product listing with search |
| `/product/:id` | `ProductDetailPage` | Product details + add-to-cart |
| `*` | `NotFoundPage` | 404 fallback |

All routes are wrapped in a `Layout` component that renders the `Header` and an `<Outlet />`.

### 4. Styling — Tailwind CSS v4 + shadcn/ui

- **Tailwind CSS v4** with the Vite plugin (`@tailwindcss/vite`).
- **shadcn/ui** components (radix-nova style) for Badge, Breadcrumb, Button, Card, and Input.
- **Lucide React** for all iconography.
- Custom CSS variables defined in `index.css` for theming.

### 5. API Proxy

In development, Vite proxies `/api` requests to `https://itx-frontend-test.onrender.com`, avoiding CORS issues. This is configured in `vite.config.ts`.

### 6. TypeScript

Strict TypeScript with path aliases (`@/` → `src/`). Compiler targets ES2023 with bundler module resolution. Strict lint rules enabled (`noUnusedLocals`, `noUnusedParameters`).
