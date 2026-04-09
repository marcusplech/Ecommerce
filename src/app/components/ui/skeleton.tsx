import type { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/90 dark:bg-white/[0.08] ${className}`}
      {...props}
    />
  );
}

/** Grade de cartões no mesmo layout da listagem de produtos */
export function ProductGridSkeleton() {
  return (
    <div
      className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">A carregar produtos</span>
      <div className="mb-10 space-y-3">
        <Skeleton className="h-4 w-24 rounded-md" />
        <Skeleton className="h-9 w-48 max-w-[min(100%,20rem)] sm:h-10 sm:w-56" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.06]"
          >
            <Skeleton className="aspect-square w-full rounded-none rounded-t-2xl" />
            <div className="space-y-3 p-5">
              <div className="flex justify-between gap-2">
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-6 w-20 shrink-0 rounded-lg" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <div className="flex justify-end pt-2">
                <Skeleton className="h-10 w-28 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CartViewSkeleton() {
  return (
    <div
      className="mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">A carregar carrinho</span>
      <Skeleton className="mb-2 h-10 w-48 max-w-[min(100%,16rem)] sm:h-11" />
      <Skeleton className="mb-10 h-4 w-64 max-w-full" />
      <div className="flex flex-col gap-6">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 sm:flex-row dark:border-white/[0.06]"
          >
            <Skeleton className="h-48 w-full shrink-0 rounded-none sm:h-auto sm:w-44" />
            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/5 max-w-xs" />
                <Skeleton className="h-7 w-28" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-10 w-32 rounded-xl" />
                <Skeleton className="h-10 w-24 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CheckoutFlowSkeleton() {
  return (
    <div
      className="mx-auto max-w-2xl px-4 pb-20 pt-24 sm:px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">A carregar checkout</span>
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl dark:border-white/[0.08] dark:bg-[#131b2e]/80 sm:p-8">
        <Skeleton className="mx-auto mb-8 h-8 w-48" />
        <div className="mb-8 flex gap-2 border-b border-slate-200 pb-3 dark:border-white/10">
          <Skeleton className="h-5 flex-1" />
          <Skeleton className="h-5 flex-1" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full sm:col-span-2" />
            <Skeleton className="h-11 w-full sm:col-span-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function InlineButtonSkeleton({ className = "" }: { className?: string }) {
  return (
    <Skeleton
      className={`inline-block h-9 min-w-[7rem] rounded-xl ${className}`}
      aria-hidden
    />
  );
}

export function OrderConfirmationSkeleton() {
  return (
    <div
      className="flex flex-col items-center gap-4 py-8"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">A confirmar pedido</span>
      <Skeleton className="h-7 w-full max-w-md" />
      <Skeleton className="h-4 w-56 max-w-full" />
      <Skeleton className="mt-2 h-11 w-48 rounded-xl" />
    </div>
  );
}
