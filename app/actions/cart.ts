'use server';

import { getOrCreateCart } from '@/lib/cart';
import { revalidatePath } from 'next/cache';
import { checkoutSchema } from '@/lib/validation/checkout';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { stripe } from '@/lib/stripe';

export type CheckoutState = {
  errors?: Record<string, string[]>;
  success?: boolean;
  values?: Record<string, string>;
  redirectUrl?: string | null;
};

export async function addToCart(productId: string) {
  const cart = await getOrCreateCart();

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: productId,
      },
    }
  });

  if (cartItem) {
    await prisma.cartItem.update({
      where: {
        id: cartItem.id
      },
      data: {
        quantity: ++cartItem.quantity
      }
    })

    return;
  }

  await prisma.cartItem.create({
    data: {
      productId,
      quantity: 1,
      cartId: cart.id
    }
  });

  revalidatePath('/cart');
}

export async function submitCheckout(
  prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {

  const raw = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    address: formData.get('address'),
    city: formData.get('city'),
    postalCode: formData.get('postalCode'),
    country: formData.get('country'),
  };

  const result = checkoutSchema.safeParse(raw);

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      values: raw as Record<string, string>,
    };
  }

  const { data } = result;

  const findOrCreateUser = await prisma.user.upsert({
    where: {
      email: data.email,
    },
    update: {},
    create: {
      email: data.email,
      name: data.fullName
    },
  });

  const cart = await getOrCreateCart();

  const cartItems = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true },
  });

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId: findOrCreateUser.id,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      total,
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.product.name },
        unit_amount: item.product.price, // Stripe wants cents — matches your schema already
      },
      quantity: item.quantity,
    })),
    metadata: {
      orderId: order.id, // CRITICAL — this is how the webhook will know which order to mark as paid
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmation?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
  });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return { success: true, redirectUrl: session.url ?? null };
}
