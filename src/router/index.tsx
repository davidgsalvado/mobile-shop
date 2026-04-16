import { createBrowserRouter } from 'react-router-dom';
import ProductListPage   from '../pages/ProductListPage';
import ProductDetailPage from '../pages/ProductDetailPage';

export const router = createBrowserRouter([
  { path: '/',          element: <ProductListPage /> },
  { path: '/product/:id', element: <ProductDetailPage /> },
]);