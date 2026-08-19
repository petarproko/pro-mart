import { prisma } from '@/lib/prisma';

export async function getAllProducts() {
  return prisma.product.findMany();
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}
