import { ProductGrid } from "@/components/product-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Início",
  description:
    "Catálogo de produtos de demonstração — camisetas, calçado, acessórios e mais.",
};

export default function HomePage() {
  return <ProductGrid />;
}
