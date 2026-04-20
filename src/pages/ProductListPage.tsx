import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductGrid from '@/components/product/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

export default function ProductListPage() {
  const { data: products = [], isLoading } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return products.filter(({ brand, model }) =>
      `${brand} ${model}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <div className="flex flex-col gap-8">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl font-black text-foreground tracking-tight">
            Smartphones
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Discover the latest devices engineered for performance.
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <Input
            type="text"
            placeholder="Search brand or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-gray-200 shadow-sm"
          />
        </div>
      </div>

      {!isLoading && (
        <p className="text-sm text-gray-400 -mt-4">
          {filtered.length} {filtered.length === 1 ? 'device' : 'devices'} found
        </p>
      )}

      <ProductGrid products={filtered} isLoading={isLoading} />

    </div>
  );
}