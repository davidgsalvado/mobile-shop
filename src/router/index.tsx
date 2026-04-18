// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout              from '@/components/layout/Layout';
import ProductListPage     from '@/pages/ProductListPage';
import ProductDetailPage   from '@/pages/ProductDetailPage';
import NotFoundPage        from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,          // Header lives here
    children: [
      { index: true,          element: <ProductListPage /> },
      { path: 'product/:id',  element: <ProductDetailPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);