"use client";

import type { AddressFormValues } from "./address-form";
import { OrderReview } from "./order-review";

type Line = {
  name: string;
  quantity: number;
  line_total: { formatted_with_symbol: string };
};

export function CheckoutConfirmStep({
  lineItems,
  subtotalFormatted,
  shippingData,
  backStep,
  onConfirmDemo,
}: {
  lineItems: Line[];
  subtotalFormatted: string;
  shippingData: AddressFormValues;
  backStep: () => void;
  onConfirmDemo: () => void;
}) {
  return (
    <div>
      <OrderReview
        lineItems={lineItems}
        subtotalFormatted={subtotalFormatted}
      />
      <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-700 dark:bg-neutral-900">
        <p className="font-medium text-neutral-800 dark:text-neutral-200">
          Entrega para:
        </p>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          {shippingData.firstName} {shippingData.lastName}
          <br />
          {shippingData.address1} — {shippingData.city}/{shippingData.state} — CEP{" "}
          {shippingData.zip}
          <br />
          {shippingData.email}
        </p>
      </div>
      <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
      <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Pagamento (demonstração)
      </h3>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        Este é um e-commerce de exemplo: não há cobrança real. Clique abaixo para
        simular a conclusão do pedido.
      </p>
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <button
          type="button"
          onClick={backStep}
          className="rounded-lg border border-neutral-400 px-6 py-3 font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={onConfirmDemo}
          className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700"
        >
          Confirmar pedido — {subtotalFormatted}
        </button>
      </div>
    </div>
  );
}
