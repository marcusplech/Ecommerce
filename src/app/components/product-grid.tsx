"use client";

import { useAppTheme } from "@/contexts/theme-context";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "./product-card";
import { ProductGridSkeleton } from "./ui/skeleton";

export function ProductGrid() {
  const { theme } = useAppTheme();
  const { data: products, isLoading, isError, error } = useProducts();
  const isDark = theme.isDarkMode;

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600 dark:text-red-400" role="alert">
        {error instanceof Error
          ? error.message
          : "Não foi possível carregar os produtos."}
      </p>
    );
  }

  const list = products ?? [];

  return (
    <main
      className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="mb-10">
        <p
          className={`mb-2 text-sm font-medium uppercase tracking-widest ${
            isDark ? "text-cyan-400/80" : "text-violet-600"
          }`}
        >
          Catálogo
        </p>
        <h1
          className={`text-3xl font-bold tracking-tight sm:text-4xl ${
            isDark
              ? "bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
              : ""
          }`}
          style={!isDark ? { color: theme.text } : undefined}
        >
          Produtos
        </h1>
        <p
          className="mt-2 max-w-xl text-base"
          style={{ color: theme.description }}
        >
          Peças selecionadas com visual limpo — experimente o tema escuro.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4}
          />
        ))}
      </div>
    </main>
  );
}
