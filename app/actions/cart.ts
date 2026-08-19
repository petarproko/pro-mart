'use server';

import { getOrCreateCart } from '@/lib/cart';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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
