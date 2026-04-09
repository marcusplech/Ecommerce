"use client";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cartQueryKey, useCart, useEmptyCart } from "@/hooks/use-cart";
import { AddressForm, type AddressFormValues } from "./address-form";
import { CheckoutConfirmStep } from "./checkout-confirm";
import {
  CheckoutFlowSkeleton,
  OrderConfirmationSkeleton,
} from "./ui/skeleton";

const steps = ["Endereço de Entrega", "Revisão e confirmação"] as const;

type Order = {
  customer?: { firstname: string; lastname: string };
  customer_reference?: string;
};

export function CheckoutFlow() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: cart, isLoading: cartLoading } = useCart();
  const emptyCartMutation = useEmptyCart();

  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState<AddressFormValues | null>(
    null
  );
  const [order, setOrder] = useState<Order | null>(null);

  const nextStep = () =>
    setActiveStep((s) => Math.min(s + 1, steps.length));
  const backStep = () => setActiveStep((s) => Math.max(s - 1, 0));

  useEffect(() => {
    if (cartLoading) return;
    if (activeStep >= steps.length) return;
    if (cart && (!cart.line_items || cart.line_items.length === 0)) {
      router.replace("/cart");
    }
  }, [cart, cartLoading, router, activeStep]);

  const handleAddressSubmit = (data: AddressFormValues) => {
    setShippingData(data);
    nextStep();
  };

  const handleConfirmDemo = async () => {
    if (!shippingData) return;

    const ref = `DEMO-${Date.now().toString(36).toUpperCase()}`;
    setOrder({
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
      },
      customer_reference: ref,
    });

    await emptyCartMutation.mutateAsync();
    await queryClient.invalidateQueries({ queryKey: cartQueryKey });
    nextStep();
  };

  const Confirmation = () => {
    if (order?.customer) {
      return (
        <div className="space-y-4 text-center">
          <p className="text-lg text-neutral-900 dark:text-neutral-50">
            Obrigado por comprar conosco, {order.customer.firstname}{" "}
            {order.customer.lastname}!
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Pedido de demonstração — ref: {order.customer_reference}
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg border border-neutral-400 px-6 py-3 font-medium text-neutral-800 dark:border-neutral-500 dark:text-neutral-200"
          >
            Voltar para o início
          </Link>
        </div>
      );
    }

    return <OrderConfirmationSkeleton />;
  };

  if (cartLoading || !cart) {
    return <CheckoutFlowSkeleton />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-24 sm:px-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-slate-900/[0.06] backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#131b2e]/95 dark:shadow-2xl dark:shadow-black/50 dark:ring-1 dark:ring-white/[0.05] sm:p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Finalizando
        </h1>
        <div className="mb-8 flex border-b border-neutral-200 dark:border-neutral-700">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`flex-1 pb-3 text-center text-sm font-medium ${
                index === activeStep
                  ? "border-b-2 border-violet-600 text-violet-600 dark:text-violet-400"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {activeStep === steps.length ? (
          <Confirmation />
        ) : activeStep === 0 ? (
          <AddressForm onSubmit={handleAddressSubmit} />
        ) : shippingData ? (
          <CheckoutConfirmStep
            lineItems={cart.line_items}
            subtotalFormatted={cart.subtotal.formatted_with_symbol}
            shippingData={shippingData}
            backStep={backStep}
            onConfirmDemo={handleConfirmDemo}
          />
        ) : null}
      </div>
    </div>
  );
}
