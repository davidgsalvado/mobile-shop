# Tech Stack & Dependencies

## Core

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2 | UI library |
| **TypeScript** | ~6.0 | Static typing |
| **Vite** | 8.0 | Build tool & dev server |

## Styling

| Library | Version | Purpose |
|---------|---------|---------|
| **Tailwind CSS** | 4.2 | Utility-first CSS framework |
| `@tailwindcss/vite` | 4.2 | Tailwind Vite plugin (no PostCSS config needed) |
| `tw-animate-css` | 1.4 | Animation utilities for Tailwind |
| `@fontsource-variable/inter` | 5.2 | Self-hosted Inter variable font |

## UI Components

| Library | Version | Purpose |
|---------|---------|---------|
| **shadcn/ui** (`shadcn`) | 4.3 | Prebuilt, customizable component primitives |
| `radix-ui` | 1.4 | Accessible, unstyled UI primitives (used by shadcn) |
| `class-variance-authority` | 0.7 | Variant-based component styling |
| `clsx` | 2.1 | Conditional class name joining |
| `tailwind-merge` | 3.5 | Intelligent Tailwind class merging |
| `lucide-react` | 1.8 | Icon library |

## Routing

| Library | Version | Purpose |
|---------|---------|---------|
| `react-router-dom` | 7.14 | Client-side SPA routing |

## Data Fetching & Caching

| Library | Version | Purpose |
|---------|---------|---------|
| `@tanstack/react-query` | 5.99 | Server state management, caching, mutations |
| `@tanstack/react-query-persist-client` | 5.99 | Persist query cache across sessions |
| `@tanstack/query-async-storage-persister` | 5.99 | Async localStorage adapter for persistence |

## Client State

| Library | Version | Purpose |
|---------|---------|---------|
| `zustand` | 5.0 | Lightweight global state (cart count, breadcrumb title) |

## Dev Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| `@vitejs/plugin-react` | 6.0 | React Fast Refresh for Vite |
| `eslint` | 9.39 | Linting |
| `typescript-eslint` | 8.58 | TypeScript ESLint rules |
| `eslint-plugin-react-hooks` | 7.0 | React hooks lint rules |
| `eslint-plugin-react-refresh` | 0.5 | React Refresh lint rules |
| `globals` | 17.4 | Global variable definitions for ESLint |
| `postcss` | 8.5 | CSS processing |
| `autoprefixer` | 10.5 | Vendor prefix automation |
| `vitest` | *(via script)* | Unit test runner |

## Dependency Graph (simplified)

```
App.tsx
├── react-router-dom   → RouterProvider
├── @tanstack/react-query → QueryClientProvider
│   └── query-persist-client → localStorage persister
├── Pages
│   ├── ProductListPage → useProducts (react-query) + search filter
│   └── ProductDetailPage → useProductDetail, useAddToCart, useProductSpecs
│       └── zustand stores (cartStore, detailStore)
└── Components
    ├── Layout (Header + Outlet)
    │   └── shadcn/ui (Breadcrumb, Badge, Button, Card, Input)
    └── Product (ProductCard, ProductGrid)
```
