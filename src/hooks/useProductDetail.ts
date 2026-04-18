import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/api/productApi';
import type { ProductDetail } from '@/types/product';

export const useProductDetail = (id: string) =>
  useQuery<ProductDetail>({
    queryKey: ['product', id],   // cached separately per product id
    queryFn:  () => getProductById(id),
    enabled:  !!id,              // avoids firing if id is undefined
});