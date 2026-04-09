"use client";

import Image from "next/image";
import { useState } from "react";
import { useAppTheme } from "@/contexts/theme-context";
import { useAddToCart } from "@/hooks/use-cart";
import type { ProductCardDTO } from "@/hooks/use-products";
import { InlineButtonSkeleton } from "./ui/skeleton";

export function ProductCard({ product }: { product: ProductCardDTO }) {
  const { theme } = useAppTheme();
  const addToCart = useAddToCart();
  const [busy, setBusy] = useState(false);
  const isDark = theme.isDarkMode;

  const image = product.media?.source ?? "";
  const price = product.price.formatted_with_symbol;

  const handleAdd = async () => {
    setBusy(true);
    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity: 1,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
        isDark
          ? "border-white/[0.06] shadow-xl shadow-black/40 ring-1 ring-white/[0.04] hover:border-violet-500/20 hover:shadow-violet-950/20"
          : "border-slate-200/90 bg-white shadow-md shadow-slate-900/[0.06] hover:-translate-y-0.5 hover:border-slate-300/80 hover:shadow-lg"
      }`}
      style={{ backgroundColor: isDark ? theme.nav : "#ffffff" }}
    >
      <div
        className="relative aspect-square w-full overflow-hidden"
        style={{ backgroundColor: theme.primary }}
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
        {isDark ? (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131b2e]/60 to-transparent" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2
            className="text-lg font-semibold leading-snug tracking-tight"
            style={{ color: theme.text }}
          >
            {product.name}
          </h2>
          <span
            className={`shrink-0 rounded-lg px-2 py-0.5 text-sm font-semibold tabular-nums ${
              isDark
                ? "bg-cyan-500/10 text-cyan-300"
                : "bg-violet-50 text-violet-700"
            }`}
          >
            {price}
          </span>
        </div>
        <div
          className="prose prose-sm mb-5 max-w-none flex-1 leading-relaxed dark:prose-invert"
          style={{ color: theme.description }}
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="mt-auto flex justify-end">
          {busy ? (
            <InlineButtonSkeleton className="h-10 w-[7.25rem]" />
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition hover:brightness-110 active:scale-[0.98] dark:from-violet-500 dark:to-cyan-500 dark:shadow-cyan-500/20"
              aria-label="Adicionar ao carrinho"
            >
              Adicionar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
