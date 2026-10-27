import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getOrderById } from '@/lib/services/order-service';

export const dynamic = 'force-dynamic'; // order data, per-user, never cache

type Props = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  if (!orderId) {
    notFound();
  }

  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">
        {order.status === 'PAID' ? 'Order confirmed! 🎉' : 'Order received'}
      </h1>
      <p className="text-gray-500 mb-8">
        Thanks{order.user.name ? `, ${order.user.name}` : ''} — order #{order.id.slice(0, 8)} is being processed.
      </p>

      <div className="space-y-4 border-t pt-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.product.name} × {item.quantity}</span>
            <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
          </div>
        ))}
        <div className="text-xl font-bold pt-4 border-t">
          Total: ${(order.total / 100).toFixed(2)}
        </div>
      </div>

      <p className="mt-6 text-sm">
        Shipping to: {order.address}, {order.city}, {order.postalCode}, {order.country}
      </p>

      <Link href="/" className="inline-block mt-8 text-orange font-semibold">
        ← Continue shopping
      </Link>
    </div>
  );
}