'use client';

import { addToCart } from '@/app/actions/cart';

export function AddToCartButton({ productId }: { productId: string }) {
  return (
    <button
      onClick={() => addToCart(productId)}
      className="
        bg-like-red
        text-white
        px-4 py-2
        rounded-lg
        transition-colors
        duration-200
        hover:bg-like-red/90
        active:bg-like-red/70
      "
    // className="bg-[--like-orange] text-like-red px-4 py-2 rounded-lg"
    >
      Add to cart
    </button>
  );
}