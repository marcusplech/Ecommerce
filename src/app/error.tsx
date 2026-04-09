"use client";

import { useEffect } from "react";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-violet-600 dark:text-cyan-400">
          Algo correu mal
        </p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Não foi possível carregar esta secção
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {error.digest
            ? `Referência: ${error.digest}`
            : error.message || "Tenta novamente dentro de momentos."}
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 dark:from-violet-500 dark:to-cyan-500"
      >
        Tentar outra vez
      </button>
    </div>
  );
}
