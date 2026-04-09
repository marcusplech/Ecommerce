"use client";

type Line = {
  name: string;
  quantity: number;
  line_total: { formatted_with_symbol: string };
};

export function OrderReview({
  lineItems,
  subtotalFormatted,
}: {
  lineItems: Line[];
  subtotalFormatted: string;
}) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Resumo do Pedido
      </h3>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {lineItems.map((product, index) => (
          <li
            key={`${product.name}-${index}`}
            className="flex items-start justify-between gap-4 py-3"
          >
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {product.name}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Quantidade: {product.quantity}
              </p>
            </div>
            <p className="text-sm text-neutral-800 dark:text-neutral-200">
              {product.line_total.formatted_with_symbol}
            </p>
          </li>
        ))}
        <li className="flex items-center justify-between py-3 font-semibold text-neutral-900 dark:text-neutral-50">
          <span>Total</span>
          <span>{subtotalFormatted}</span>
        </li>
      </ul>
    </div>
  );
}
