import { getOrCreateCart } from '@/lib/cart';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Metadata } from 'next/types';

export const dynamic = 'force-dynamic'; // cart is per-user, never static/ISR

export const metadata: Metadata = {
  title: "Pro Mart | Cart",
  description: "Propetar Mart for all of your needs",
};

export default async function CartPage() {
  const cart = await getOrCreateCart();

  const items = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true }, // pulls in full product data per item
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-like-black px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-white/50">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart items */}
          <section className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-white/10 p-4 transition hover:border-like-yellow/30"
              >
                {/* Product image */}
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-white/10">
                    <Image
                      src={item.product.imageUrl || '/images/product-image.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  
                </div>

                {/* Product information */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h2 className="truncate text-lg font-semibold">
                      {item.product.name}
                    </h2>

                    <p className="mt-1 text-like-orange">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center overflow-hidden rounded-lg border border-white/10">
                      <button
                        // onClick={() =>
                        //   updateQuantity(item.id, item.quantity - 1)
                        // }
                        disabled={item.quantity <= 1}
                        className="flex h-9 w-9 items-center justify-center text-lg text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        -
                      </button>

                      <span className="flex h-9 min-w-10 items-center justify-center border-x border-white/10 text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        // onClick={() =>
                        //   updateQuantity(item.id, item.quantity + 1)
                        // }
                        className="flex h-9 w-9 items-center justify-center text-lg text-white/70 transition hover:bg-white/10"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      // onClick={() => removeItem(item.id)}
                      className="text-sm text-like-red transition hover:text-like-orange"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item total */}
                <div className="hidden text-right sm:block">
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-white/10 p-6 lg:sticky lg:top-6">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span className="text-white">
                  {/* ${subtotal.toFixed(2)} */}
                </span>
              </div>

              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span className="text-white">
                  Free
                  {/* {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} */}
                </span>
              </div>

              {/* {subtotal > 0 && subtotal < 100 && (
                <div className="rounded-xl bg-like-yellow/10 p-3 text-sm text-like-yellow">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping.
                </div>
              )} */}

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total</span>

                  <span className="text-2xl font-bold text-like-yellow">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-like-yellow px-6 py-4 font-bold text-like-black transition hover:bg-like-orange active:scale-[0.98]">
              Proceed to Checkout
            </button>

            <button className="mt-3 w-full rounded-xl border border-white/10 px-6 py-3 font-medium text-white/70 transition hover:border-like-yellow/40 hover:text-white">
              Continue Shopping
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}