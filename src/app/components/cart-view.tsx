"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppTheme } from "@/contexts/theme-context";
import {
  useCart,
  useEmptyCart,
  useRemoveFromCart,
  useUpdateCartItem,
} from "@/hooks/use-cart";
import { CartItemCard, type LineItem } from "./cart-item-card";
import { CartViewSkeleton, InlineButtonSkeleton } from "./ui/skeleton";

export function CartView() {
  const { theme } = useAppTheme();
  const isDark = theme.isDarkMode;
  const { data: cart, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();
  const emptyCart = useEmptyCart();
  const [rowBusy, setRowBusy] = useState(false);
  const [emptyBusy, setEmptyBusy] = useState(false);

  const handleUpdateQty = async (lineItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setRowBusy(true);
    try {
      await updateItem.mutateAsync({ lineItemId, quantity });
    } catch (e) {
      console.error(e);
    } finally {
      setRowBusy(false);
    }
  };

  const handleRemove = async (lineItemId: string) => {
    setRowBusy(true);
    try {
      await removeItem.mutateAsync(lineItemId);
    } catch (e) {
      console.error(e);
    } finally {
      setRowBusy(false);
    }
  };

  const handleEmpty = async () => {
    setEmptyBusy(true);
    try {
      await emptyCart.mutateAsync();
    } catch (e) {
      console.error(e);
    } finally {
      setEmptyBusy(false);
    }
  };

  if (isLoading || !cart) {
    return <CartViewSkeleton />;
  }

  const lineItems = cart.line_items;
  const isEmpty = !lineItems?.length;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6">
      <h1
        className={`mb-2 text-3xl font-bold tracking-tight sm:text-4xl ${
          isDark
            ? "bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
            : ""
        }`}
        style={!isDark ? { color: theme.text } : undefined}
      >
        Carrinho
      </h1>
      <p className="mb-10 text-base" style={{ color: theme.description }}>
        Revise os itens antes de finalizar.
      </p>

      {isEmpty ? (
        <div
          className={`rounded-2xl border p-10 text-center ${
            isDark
              ? "border-white/[0.06] bg-[#131b2e]/50 ring-1 ring-white/[0.04]"
              : "border-slate-200/80 bg-white/80 shadow-md shadow-slate-900/[0.04]"
          }`}
        >
          <p style={{ color: theme.text }}>
            Seu carrinho está vazio.{" "}
            <Link
              href="/"
              className={`font-semibold underline decoration-2 underline-offset-2 ${
                isDark
                  ? "text-cyan-400 decoration-cyan-500/50"
                  : "text-violet-600 decoration-violet-300"
              }`}
            >
              Ver produtos
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="mb-10 flex flex-col gap-6">
            {(lineItems as LineItem[]).map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                busy={rowBusy}
                onUpdateQty={handleUpdateQty}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <div
            className={`flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <p
              className={`text-2xl font-bold tabular-nums ${
                isDark ? "text-cyan-200/90" : "text-slate-900"
              }`}
            >
              Subtotal: {cart.subtotal?.formatted_with_symbol}
            </p>
            <div className="flex flex-wrap gap-3">
              {emptyBusy ? (
                <InlineButtonSkeleton className="h-11 min-w-[6.5rem]" />
              ) : (
                <button
                  type="button"
                  onClick={handleEmpty}
                  className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                    isDark
                      ? "border border-white/15 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Esvaziar
                </button>
              )}
              <Link
                href="/checkout"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 dark:from-violet-500 dark:to-cyan-500 dark:shadow-cyan-500/20"
              >
                Finalizar compra
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
