"use client";

import Image from "next/image";
import { useAppTheme } from "@/contexts/theme-context";

export type LineItem = {
  id: string;
  name: string;
  quantity: number;
  line_total: { formatted_with_symbol: string };
  media?: { source?: string };
};

export function CartItemCard({
  item,
  busy,
  onUpdateQty,
  onRemove,
}: {
  item: LineItem;
  busy: boolean;
  onUpdateQty: (lineItemId: string, quantity: number) => void;
  onRemove: (lineItemId: string) => void;
}) {
  const { theme } = useAppTheme();
  const isDark = theme.isDarkMode;
  const img = item.media?.source ?? "";

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border sm:flex-row ${
        isDark
          ? "border-white/[0.06] shadow-lg shadow-black/30 ring-1 ring-white/[0.04]"
          : "border-slate-200/90 shadow-md shadow-slate-900/[0.05]"
      }`}
      style={{ backgroundColor: theme.nav }}
    >
      <div
        className="relative h-48 w-full shrink-0 sm:h-auto sm:w-44"
        style={{ backgroundColor: theme.primary }}
      >
        {img ? (
          <Image
            src={img}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover"
          />
        ) : null}
        {isDark ? (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-[#131b2e]/40 sm:bg-gradient-to-l" />
        ) : null}
      </div>
      <div
        className="flex flex-1 flex-col justify-between gap-4 p-5"
        style={{ color: theme.text }}
      >
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{item.name}</h3>
          <p
            className={`mt-1 text-lg font-semibold tabular-nums ${
              isDark ? "text-cyan-300/90" : "text-violet-700"
            }`}
          >
            {item.line_total.formatted_with_symbol}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`inline-flex items-center gap-1 rounded-xl border p-0.5 ${
              isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <button
              type="button"
              className={`rounded-lg px-3 py-1.5 text-lg font-medium transition hover:bg-white/10 disabled:opacity-40 dark:hover:bg-white/10 ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
              disabled={busy}
            >
              −
            </button>
            <span className="min-w-[2.5ch] text-center text-sm font-semibold tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              className={`rounded-lg px-3 py-1.5 text-lg font-medium transition hover:bg-white/10 disabled:opacity-40 dark:hover:bg-white/10 ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
              disabled={busy}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-red-500/20 transition hover:bg-red-600 disabled:opacity-50"
            onClick={() => onRemove(item.id)}
            disabled={busy}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
