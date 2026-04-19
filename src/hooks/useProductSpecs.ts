import { useMemo } from 'react';
import { Cpu, Monitor, Camera, Ruler, Weight, MemoryStick, Power } from 'lucide-react';
import type { ProductDetail } from '@/types/product';
import { isValid } from '@/utils/validation';

const toStr = (value: string | string[]) =>
  Array.isArray(value) ? value.filter(isValid).join(' + ') : value;

export const useProductSpecs = (product: ProductDetail | undefined) =>
  useMemo(() => {
    if (!product) return { specs: [], storages: [], colors: [] }; 

    return {
      specs: [
        { icon: Cpu,     label: 'Processor',  value: product.cpu },
        { icon: Monitor, label: 'Display',    value: product.displayResolution },
        { icon: Camera,  label: 'Camera',     value: toStr(product.primaryCamera) },
        { icon: Camera,  label: 'Secondary Camera', value: toStr(product.secondaryCmera) },
        { icon: Ruler,   label: 'Dimensions', value: product.dimentions },
        { icon: Weight,  label: 'Weight (g)',     value: product.weight },
        { icon: MemoryStick,   label: 'RAM',        value: product.ram },
        { icon: Power, label: 'Operating System',         value: product.os },
      ].filter(({ value }) => isValid(value)),

      storages: product.options.storages.filter(({ name }) => isValid(name)),
      colors:   product.options.colors.filter(({ name }) => isValid(name)),
    };
  }, [product]);