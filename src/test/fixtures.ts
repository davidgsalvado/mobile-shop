import type { ProductDetail } from '@/types/product';

/** A fully-populated product for testing. */
export const fullProduct: ProductDetail = {
  id: '1',
  brand: 'Samsung',
  model: 'Galaxy S24',
  price: 899,
  imgUrl: 'https://example.com/s24.png',
  cpu: 'Snapdragon 8 Gen 3',
  ram: '8 GB',
  os: 'Android 14',
  displayResolution: '1440 x 3120',
  battery: '4000 mAh',
  primaryCamera: ['50 MP', '12 MP'],
  secondaryCmera: ['12 MP'],
  dimentions: '147 x 70.6 x 7.6 mm',
  weight: '167',
  options: {
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'White' },
    ],
    storages: [
      { code: 100, name: '128 GB' },
      { code: 200, name: '256 GB' },
    ],
  },
};

/** Product with several missing/invalid fields. */
export const partialProduct: ProductDetail = {
  id: '2',
  brand: 'Xiaomi',
  model: 'Redmi Note',
  price: '' as unknown as number,
  imgUrl: 'https://example.com/redmi.png',
  cpu: 'MediaTek Helio',
  ram: '4 GB',
  os: 'Android 13',
  displayResolution: '1080 x 2400',
  battery: '',               // empty → invalid
  primaryCamera: ['48 MP'],
  secondaryCmera: ['-'],     // dash → invalid
  dimentions: 'N/A',         // N/A → invalid
  weight: '-',               // dash → invalid
  options: {
    colors: [{ code: 1, name: 'Blue' }],
    storages: [{ code: 100, name: '64 GB' }],
  },
};

/** Product with NO price (empty string from API). */
export const noPriceProduct: ProductDetail = {
  ...fullProduct,
  id: '3',
  price: '' as unknown as number,
};

/** Product with battery = "-" so it shouldn't render battery badge. */
export const noBatteryProduct: ProductDetail = {
  ...fullProduct,
  id: '4',
  battery: '-',
};

/** Product with a single storage & single color (auto-select). */
export const singleOptionProduct: ProductDetail = {
  ...fullProduct,
  id: '5',
  options: {
    colors: [{ code: 1, name: 'Black' }],
    storages: [{ code: 100, name: '128 GB' }],
  },
};

/** Product where ALL optional fields are invalid. */
export const minimalProduct: ProductDetail = {
  id: '6',
  brand: 'Generic',
  model: 'Phone',
  price: '' as unknown as number,
  imgUrl: 'https://example.com/phone.png',
  cpu: '-',
  ram: '-',
  os: '-',
  displayResolution: '-',
  battery: '-',
  primaryCamera: ['-'],
  secondaryCmera: ['-'],
  dimentions: '-',
  weight: '-',
  options: {
    colors: [],
    storages: [],
  },
};
