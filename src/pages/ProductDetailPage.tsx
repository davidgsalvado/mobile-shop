import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, ShoppingCart, Truck, BatteryFull
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useProductSpecs } from '@/hooks/useProductSpecs';
import { useDetailStore } from '@/store/detailStore';
import { isValid } from '@/utils/validation';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProductDetail(id!);
  const { specs, storages, colors } = useProductSpecs(product);
  const setPageTitle = useDetailStore((s) => s.setPageTitle);

  useEffect(() => {
    if (product) setPageTitle(`${product.brand} ${product.model}`);

    // Clear title when leaving the page
    return () => setPageTitle('');
  }, [product, setPageTitle]);

  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedColor, setSelectedColor]     = useState<number | null>(null);

  const { mutate: addToCart, isPending } = useAddToCart();

  const effectiveStorage = useMemo(() =>
    selectedStorage ?? (product?.options.storages.length === 1 ? product.options.storages[0].code : null),
    [product, selectedStorage]
  );

  const effectiveColor = useMemo(() =>
    selectedColor ?? (product?.options.colors.length === 1 ? product.options.colors[0].code : null), 
    [product, selectedColor]
  );

  const handleAddToCart = useCallback(() => {
    if (!effectiveStorage || !effectiveColor || !product) return;
    addToCart({ id: product.id, colorCode: effectiveColor, storageCode: effectiveStorage });
  }, [addToCart, product, effectiveColor, effectiveStorage]);


  // Pre-select first option when data loads
  if (product && selectedStorage === null && product.options.storages.length === 1)
    setSelectedStorage(product.options.storages[0].code);
  if (product && selectedColor === null && product.options.colors.length === 1)
    setSelectedColor(product.options.colors[0].code);

  if (isLoading) return <ProductDetailSkeleton />;
  if (isError || !product) return (
    <p className="text-center text-gray-400 mt-16">Product not found.</p>
  );

  const selectedColorName = product.options.colors.find(
    (c) => c.code === effectiveColor
  )?.name;

  return (
    <div className="flex flex-col gap-6">

      <div className="flex justify-end">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to list
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center p-6 min-h-[340px]">
          <img
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            className="max-h-[300px] w-auto object-contain"
          />

          {isValid(product.battery) && (
            <div className="absolute bottom-5 right-5 bg-white border border-gray-200 shadow-md rounded-xl px-4 py-2.5 flex items-center gap-2">
              <BatteryFull size={18} className="text-blue-600" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Battery Life
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {product.battery}
                </span>
              </div>
            </div>
          )}
        </div>  

        <div className="flex flex-col gap-6">

          <div>
            <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-1">
              {product.brand}
            </p>
            <h1 className="text-4xl font-black text-foreground tracking-tight leading-tight">
              {product.model}
            </h1>
            {isValid(product.price) ? (
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-400 italic">Tax included</span>
              </div>
            ) : (
              <div className="mt-3">
                <span className="text-lg text-gray-400 italic">
                  Price Unavailable
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-blue-50 border border-gray-100 rounded-xl p-3 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Icon size={16} />
                  <span className="text-[10px] font-semibold tracking-wider uppercase">{label}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>

          {storages.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold tracking-widest text-gray-700 uppercase">
                Storage Capacity
              </p>
              <div className="flex flex-wrap gap-2">
                {storages.map(({ code, name }) => (
                  <button
                    key={code}
                    onClick={() => setSelectedStorage(code)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors
                      ${effectiveStorage === code
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-100 text-gray-700 border-gray-100 hover:border-blue-300'
                      }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {colors.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-widest text-gray-700 uppercase">
                  Finish Color
                </p>
                {effectiveColor && (
                  <span className="text-sm text-gray-500">{selectedColorName}</span>
                )}
              </div>
              <div className="flex gap-3">
                {colors.map(({ code, name }) => (
                  <button
                    key={code}
                    title={name}
                    onClick={() => setSelectedColor(code)}
                    style={{ backgroundColor: name.toLowerCase().replace(/\s/g, '') }}
                    className={`w-9 h-9 rounded-full border-2 transition-all
                      ${selectedColor === code
                        ? 'border-blue-600 scale-110 shadow-md'
                        : 'border-transparent hover:border-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-2">
            <Button
              onClick={handleAddToCart}
              disabled={isPending || !selectedStorage || !selectedColor}
              className="w-full h-14 text-base font-bold bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              {isPending ? 'Adding...' : 'Add to Cart'}
            </Button>
            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
              <Truck size={14} />
              Free expedited shipping on orders over $500
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
      <div className="bg-gray-200 rounded-2xl min-h-[420px]" />
      <div className="flex flex-col gap-4">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-10 w-64 bg-gray-200 rounded" />
        <div className="h-8 w-32 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="h-10 w-full bg-gray-200 rounded-xl mt-4" />
        <div className="h-14 w-full bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}