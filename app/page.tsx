import { prisma } from "@/lib/prisma";
import { getAllProducts } from "@/lib/services/product-service";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-like-black">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-like-black rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/products/${product.slug}`}>
              <Image
                src="/images/product-image.jpg"
                alt="Product image"
                width={400}
                height={300}
                className="object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-like-black">{product.name}</h2>
                <p className="text-sm text-like-red line-clamp-2 mt-1">{product.description}</p>
                <p className="text-lg text-like-orange font-bold mt-2">${(product.price / 100).toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
