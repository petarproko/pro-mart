import { CheckoutState, submitCheckout } from "../actions/cart";
import CheckoutForm from "@/components/CheckoutForm";

export const dynamic = 'force-dynamic'; // cart is per-user, never static/ISR
const initialState: CheckoutState = {};

export default async function CheckoutPage() {

  return (
    <main className="px-4 py-10 text-like-black">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-like-yellow shadow-xl md:grid-cols-2">
        {/* Left: Checkout form */}
        <section className="p-6 sm:p-10">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
              Checkout
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-like-black">
              Where should we send it?
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Enter your shipping address below.
            </p>
          </div>

          <CheckoutForm />
        </section>

        {/* Right: Image / visual area */}
        <section className="relative flex items-center justify-center overflow-hidden bg-like-blue-main p-10">
          {/* Decorative shapes */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-like-black" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-like-orange" />

          <div className={
            `relative z-10 flex h-full w-full items-center
             justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm`}
          >
            <span className="text-5xl font-black tracking-tight text-white">
              PRO Mart
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}