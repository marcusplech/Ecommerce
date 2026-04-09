import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-violet-600 dark:text-cyan-400/90">
        404
      </p>
      <h1 className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-slate-400">
        Página não encontrada
      </h1>
      <p className="max-w-sm text-neutral-600 dark:text-slate-400">
        O endereço não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 dark:from-violet-500 dark:to-cyan-500"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
