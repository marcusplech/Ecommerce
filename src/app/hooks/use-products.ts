"use client";

import { useQuery } from "@tanstack/react-query";
import { CATALOG } from "@/data/products";
import { formatBRL } from "@/libs/money";
import type { CatalogProduct } from "@/types/shop";

const productsQueryKey = ["products"] as const;

export type ProductCardDTO = {
  id: string;
  name: string;
  description: string;
  media?: { source?: string };
  price: { formatted_with_symbol: string };
};

function toCardDto(p: CatalogProduct): ProductCardDTO {
  return {
    id: p.id,
    name: p.name,
    description: p.descriptionHtml,
    media: { source: p.image },
    price: { formatted_with_symbol: formatBRL(p.priceCents) },
  };
}

export function useProducts() {
  return useQuery({
    queryKey: productsQueryKey,
    queryFn: async (): Promise<ProductCardDTO[]> => {
      await new Promise((r) => setTimeout(r, 250));
      return CATALOG.map(toCardDto);
    },
    staleTime: 5 * 60 * 1000,
  });
}
