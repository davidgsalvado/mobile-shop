# Mobile Shop — PhoneHub

A single-page application for browsing and purchasing mobile devices, built as a frontend technical test for **ITX**.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm test
```

The dev server starts at `http://localhost:5173`. API requests are proxied to `https://itx-frontend-test.onrender.com`.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Routing | React Router DOM 7 (client-side SPA) |
| Data Fetching | TanStack React Query 5 |
| Client State | Zustand 5 |
| Icons | Lucide React |
| Linting | ESLint 9 + typescript-eslint |
| Testing | Vitest |

## Features

- **Product Listing (PLP)**: Responsive grid (1–4 columns), real-time search filtering by brand/model.
- **Product Detail (PDP)**: Two-column layout with image, full specs, storage/color selectors, and add-to-cart.
- **Cart**: Persistent cart count displayed in header, updated via API response.
- **Caching**: All API responses cached for 1 hour using TanStack Query + localStorage persistence.
- **Breadcrumbs**: Dynamic navigation breadcrumbs in the header.

## Project Structure

```
src/
├── api/           # HTTP client functions (fetch wrappers)
├── components/
│   ├── layout/    # Header, Layout (app shell)
│   ├── product/   # ProductCard, ProductGrid
│   └── ui/        # shadcn/ui primitives
├── hooks/         # Custom hooks (useProducts, useAddToCart, etc.)
├── lib/           # Utility functions (cn)
├── pages/         # Route-level page components
├── router/        # Route definitions
├── store/         # Zustand stores (cart, detail)
├── types/         # TypeScript interfaces
└── utils/         # Query client config, validation helpers
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/product` | List all products |
| GET | `/api/product/:id` | Get product details |
| POST | `/api/cart` | Add product to cart (`{ id, colorCode, storageCode }`) |

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `npm start` | Start Vite dev server |
| `build` | `npm run build` | Type-check + production build |
| `lint` | `npm run lint` | Run ESLint on all files |
| `test` | `npm test` | Run tests with Vitest |

## Documentation

Detailed documentation is available in the [`docs/`](docs/) folder:

- [Architecture](docs/architecture.md) — High-level architecture, folder structure, and design decisions.
- [Tech Stack](docs/tech-stack.md) — Complete list of dependencies and their purposes.
- [API Integration](docs/api-integration.md) — Endpoint details, types, and caching strategy.
- [Components](docs/components.md) — Reference for all components, hooks, and stores.

## Design Decisions

- **No SSR**: The app is a pure SPA as required — all routing is client-side.
- **Vite proxy**: In development, `/api` is proxied to the backend to avoid CORS issues.
- **Zustand for cart**: Cart count is persisted to `localStorage` so it survives page refreshes and is available globally.
- **TanStack Query persistence**: Query cache is persisted to `localStorage` with a 1-hour max age, matching the required caching behavior.
- **shadcn/ui**: Provides accessible, well-styled component primitives without heavy dependencies.
- **Validation utility**: Handles inconsistent API data (null values, "-", "N/A") gracefully.

## License

[MIT](LICENSE)