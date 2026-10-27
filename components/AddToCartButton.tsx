'use client';

import { addToCart } from '@/app/actions/cart';
import { Button } from './Button';

export function AddToCartButton({ productId }: { productId: string }) {
  return (
    <Button variant='danger'
      onClick={() => addToCart(productId)}
    >
      Add to cart
    </Button>
  );
  // return (
  //   <button
  //     onClick={() => addToCart(productId)}
  //     className="
  //       bg-like-red
  //       text-white
  //       px-4 py-2
  //       rounded-lg
  //       transition-colors
  //       duration-200
  //       hover:bg-like-red/90
  //       active:bg-like-red/70
  //       cursor-pointer
  //       active:scale-[0.98]
  //     "
  //   >
  //     Add to cart
  //   </button>
  // );
}