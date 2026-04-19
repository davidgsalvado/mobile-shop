import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import type { Product } from '@/types/product';
import { isValid } from '@/utils/validation';

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, brand, model, price, imgUrl } = product;

  return (
    <Link to={`/product/${id}`} className="group block">
      <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">

        <CardContent className="relative p-0 bg-gray-100 aspect-square flex items-center justify-center">
          <img
            src={imgUrl}
            alt={`${brand} ${model}`}
            className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-0.5 px-4 py-4">
          <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
            {brand}
          </span>
          <span className="text-base font-bold text-gray-900 leading-snug">
            {model}
          </span>
          
          {isValid(price) ? 
          (
            <span className="text-blue-600 font-semibold text-sm mt-1">
              ${price}
            </span>
          )
             : 
          (
            <span className="text-gray-500 font-semibold text-sm mt-1">
              Price Unavailable
            </span>
          )
          }
        </CardFooter>

      </Card>
    </Link>
  );
}