# API Integration

## Base URL

All API requests are made to:

```
https://itx-frontend-test.onrender.com
```

In development, Vite proxies `/api` requests to this URL (configured in `vite.config.ts`), so the app calls `/api/product` rather than the full URL.

## Endpoints

### 1. Get Product List

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/api/product` |
| **Response** | `Product[]` |

```ts
interface Product {
  id:     string;
  brand:  string;
  model:  string;
  price:  number;
  imgUrl: string;
}
```

**Implementation**: `src/api/productApi.ts` → `getProducts()`  
**Hook**: `src/hooks/useProducts.ts` → `useProducts()`

---

### 2. Get Product Detail

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/api/product/:id` |
| **Response** | `ProductDetail` |

```ts
interface ProductDetail extends Product {
  cpu:             string;
  ram:             string;
  os:              string;
  displayResolution:     string;
  battery:         string;
  primaryCamera:   string[];
  secondaryCamera: string[];
  dimentions:      string;   // note: API typo, not "dimensions"
  weight:          string;
  options: {
    colors:   { code: number; name: string }[];
    storages: { code: number; name: string }[];
  };
}
```

**Implementation**: `src/api/productApi.ts` → `getProductById(id)`  
**Hook**: `src/hooks/useProductDetail.ts` → `useProductDetail(id)`

---

### 3. Add to Cart

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/api/cart` |
| **Body** | `AddToCartBody` |
| **Response** | `AddToCartResponse` |

```ts
interface AddToCartBody {
  id:          string;
  colorCode:   number;
  storageCode: number;
}

interface AddToCartResponse {
  count: number;
}
```

**Implementation**: `src/api/cartApi.ts` → `addToCart(body)`  
**Hook**: `src/hooks/useAddToCart.ts` → `useAddToCart()`

The `count` value from the response is stored in the Zustand `cartStore` and displayed in the `Header` component.

## Caching Strategy

- **TanStack React Query** manages all server data with `staleTime: 1 hour` and `gcTime: 1 hour`.
- **localStorage persistence** via `@tanstack/query-async-storage-persister` ensures cached data survives page refreshes.
- After 1 hour, the cache is considered stale and data is refetched from the API.

## Data Validation

The API occasionally returns invalid values (`"-"`, `"N/A"`, empty strings, `null`). The `isValid()` utility in `src/utils/validation.ts` handles these cases, filtering them out before rendering specs and prices.
