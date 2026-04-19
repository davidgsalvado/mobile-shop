import { useMemo } from 'react';
import { Cpu, Monitor, Camera, Ruler, Weight } from 'lucide-react';
import type { ProductDetail } from '@/types/product';
import { isValid } from '@/utils/validation';

const toStr = (value: string | string[]) =>
  Array.isArray(value) ? value.join(' + ') : value;

export const useProductSpecs = (product: ProductDetail | undefined) =>
  useMemo(() => {
    if (!product) return { specs: [], storages: [], colors: [] }; 

    return {
      specs: [
        { icon: Cpu,     label: 'Processor',  value: product.cpu },
        { icon: Monitor, label: 'Display',    value: product.displaySize },
        { icon: Camera,  label: 'Camera',     value: toStr(product.primaryCamera) },
        { icon: Ruler,   label: 'Dimensions', value: product.dimentions },
        { icon: Weight,  label: 'Weight',     value: product.weight },
      ].filter(({ value }) => isValid(value)),

      storages: product.options.storages.filter(({ name }) => isValid(name)),
      colors:   product.options.colors.filter(({ name }) => isValid(name)),
    };
  }, [product]);