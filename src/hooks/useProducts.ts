import type { Product } from '@/types/product';
import { getProducts } from '@/api/productApi';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () =>
  useQuery<Product[]>({ queryKey: ['products'], queryFn: getProducts });