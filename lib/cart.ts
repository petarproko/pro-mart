'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const CART_COOKIE = 'cartId';

export async function getOrCreateCart() {
  const cookieStore = await cookies();
  const existingCartId = cookieStore.get(CART_COOKIE)?.value;

  if (existingCartId) {
    const cart = await prisma.cart.findUnique({
      where: { id: existingCartId },
    });
    if (cart) return cart;
    // cookie pointed to a cart that no longer exists — fall through and create a new one
  }

  const newCart = await prisma.cart.create({ data: {} });

  cookieStore.set(CART_COOKIE, newCart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return newCart;
}

export async function getCartWithProducts() {
  const cookieStore = await cookies();
  const existingCartId = cookieStore.get(CART_COOKIE)?.value;

  if (!existingCartId) {
    return {
      items: [],
      total: 0
    };
  }

  const items = await prisma.cartItem.findMany({
    where: { cartId: existingCartId },
    include: { product: true },
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return Promise.resolve({
    items,
    total
  });
}