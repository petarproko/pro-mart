'use client';

import { CheckoutState, submitCheckout } from "@/app/actions/cart";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState: CheckoutState = {};

export default function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(submitCheckout, initialState);
  const router = useRouter();
  
  useEffect(() => {
    if (state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state.redirectUrl]);

  return (
    <form className="space-y-5" action={formAction}>
      <div>
        <label
          htmlFor="fullName"
          className="mb-2 block text-sm font-semibold"
        >
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Full name"
          defaultValue={state.values?.fullName ?? ''}
          className={`w-full rounded-xl border-2
                   border-gray-200 bg-white px-4 py-3 outline-none 
                   transition placeholder:text-gray-400
                    focus:border-foreground`
          }
        />
        {state.errors?.fullName && (
          <p className="text-red-500 text-sm">{state.errors.fullName[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          defaultValue={state.values?.email ?? ''}
          className={`w-full rounded-xl border-2
                   border-gray-200 bg-white px-4 py-3 outline-none 
                   transition placeholder:text-gray-400
                    focus:border-foreground`
          }
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="mb-2 block text-sm font-semibold"
        >
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="123 Main Street"
          defaultValue={state.values?.address ?? ''}
          className={`w-full rounded-xl border-2
                   border-gray-200 bg-white px-4 py-3 outline-none 
                   transition placeholder:text-gray-400
                    focus:border-foreground`
          }
        />
        {state.errors?.address && (
          <p className="text-red-500 text-sm">{state.errors.address[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="city"
          className="mb-2 block text-sm font-semibold"
        >
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="New York"
          defaultValue={state.values?.city ?? ''}
          className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-foreground"
        />
        {state.errors?.city && (
          <p className="text-red-500 text-sm">{state.errors.city[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="postalCode"
            className="mb-2 block text-sm font-semibold"
          >
            Postal code
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            placeholder="10001"
            defaultValue={state.values?.postalCode ?? ''}
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-foreground"
          />
          {state.errors?.postalCode && (
            <p className="text-red-500 text-sm">{state.errors.postalCode[0]}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="mb-2 block text-sm font-semibold"
          >
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="United States"
            defaultValue={state.values?.country ?? ''}
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-foreground"
          />
          {state.errors?.country && (
            <p className="text-red-500 text-sm">{state.errors.country[0]}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={
          `mt-4 w-full rounded-xl bg-like-red
                 px-6 py-4 font-bold text-white transition
                  hover:bg-like-red/80 active:scale-95
                  cursor-pointer`
        }
      >
        Continue to payment
      </button>
    </form>
  );
}