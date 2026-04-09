"use client";

import Link from "next/link";
import { useAppTheme } from "@/contexts/theme-context";
import { useCart } from "@/hooks/use-cart";

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      onClick={onToggle}
      className="group relative inline-flex h-9 w-[3.35rem] shrink-0 cursor-pointer items-center rounded-full border border-slate-200/90 bg-gradient-to-b from-white to-slate-100/90 p-0.5 shadow-inner transition-all duration-300 hover:border-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:from-slate-800/90 dark:to-slate-900 dark:focus-visible:ring-cyan-400/50 dark:focus-visible:ring-offset-[#0a0e17]"
    >
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5 text-slate-400 dark:text-slate-500"
        aria-hidden
      >
        <SunIcon className="h-3.5 w-3.5 opacity-80 dark:opacity-30" />
        <MoonIcon className="h-3.5 w-3.5 opacity-30 dark:opacity-80" />
      </span>
      <span
        className={`pointer-events-none relative z-10 flex size-7 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-900/5 transition-transform duration-300 ease-out dark:bg-slate-800 dark:ring-white/10 ${
          isDark ? "translate-x-[1.28rem]" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <MoonIcon className="h-4 w-4 text-cyan-400" />
        ) : (
          <SunIcon className="h-4 w-4 text-amber-500" />
        )}
      </span>
    </button>
  );
}

export function NavBar() {
  const { theme, toggleTheme } = useAppTheme();
  const { data: cart } = useCart();
  const totalItems = cart?.total_items ?? 0;
  const isDark = theme.isDarkMode;

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-white/[0.06] bg-[#111827]/80 shadow-lg shadow-black/40"
          : "border-slate-200/70 bg-white/85 shadow-sm shadow-slate-900/[0.04]"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
          style={{ color: theme.text }}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-violet-600 to-fuchsia-600 text-sm font-bold text-white shadow-md shadow-violet-500/25 ring-1 ring-white/20">
            E
          </span>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
            E-commerce
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

          <Link
            href="/cart"
            className={`relative inline-flex rounded-xl p-2 transition-colors ${
              isDark
                ? "hover:bg-white/[0.06]"
                : "hover:bg-slate-100/80"
            }`}
            style={{ color: theme.icon }}
            aria-label="Ver carrinho"
          >
            <CartIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 px-1 text-[11px] font-semibold text-white shadow-md shadow-fuchsia-500/30">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
