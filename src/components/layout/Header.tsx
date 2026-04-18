// src/components/layout/Header.tsx
import { Link, useMatches } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const cartCount = useCartStore((s) => s.cartCount);
  const matches   = useMatches();
  const isDetail  = matches.some((m) => m.pathname.includes('product'));

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      
      {/* Top bar: logo + cart */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-black tracking-tight text-gray-900 uppercase hover:opacity-80 transition-opacity"
        >
          PhoneHub
        </Link>

        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ShoppingCart size={22} />
          <span className="text-base font-medium">({cartCount})</span>
        </Link>
      </div>

      {/* Breadcrumb row */}
      <div className="max-w-7xl mx-auto px-6 pb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-gray-500 hover:text-gray-900 text-sm">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {isDetail && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-sm font-semibold text-gray-900">
                    Detail
                  </span>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

    </header>
  );
}