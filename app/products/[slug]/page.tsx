import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { AddToCartButton } from '@/components/AddToCartButton';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) return {};

  return {
    title: `${product.name} | Pro Mart`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export const revalidate = 6000; //next.js dont rename it stupid

interface Props {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });
  // const qqq = await prisma.cart.findMany();
  const qqq = await prisma.cartItem.findMany();
console.log(qqq);

  if (product === null) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <main className="min-h-screen  text-gray-900">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/products" className="transition hover:text-gray-900">
              products
            </a>

            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 111.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.08-.02z"
                clipRule="evenodd"
              />
            </svg>

            <span className="truncate text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={product.imageUrl || "/images/product-image.jpg"}
              alt="Product image"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <AddToCartButton productId={product.id} />
            {/* Stock badge */}
            <div className="mb-5">
              {/* {isOutOfStock ? (
                <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                  Out of stock
                </span>
              ) : product.stock <= 5 ? (
                <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                  Only {product.stock} left
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  In stock
                </span>
              )} */}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-5 text-3xl font-semibold tracking-tight text-gray-950">
              {formattedPrice}
            </p>

            <div className="my-8 h-px bg-gray-200" />

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-like-black">
                Description
              </h2>

              <p className="mt-4 whitespace-pre-line text-base leading-7 text-like-red">
                {product.description}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-like-black">
                  Product ID
                </p>
                <p className="mt-1 truncate text-sm text-like-red">
                  {product.id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-like-black">
                  SKU / Slug
                </p>
                <p className="mt-1 truncate text-sm text-like-red">
                  {product.slug}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}