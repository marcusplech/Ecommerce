import type { CatalogProduct } from "@/types/shop";

/** Imagens via Unsplash (uso permitido). */
export const CATALOG: CatalogProduct[] = [
  {
    id: "camiseta-basica",
    name: "Camiseta básica algodão",
    category: "Camisetas",
    priceCents: 7990,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80",
    descriptionHtml:
      "<p>Camiseta 100% algodão, corte regular. Ideal para o dia a dia.</p>",
  },
  {
    id: "camiseta-listrada",
    name: "Camiseta listrada",
    category: "Camisetas",
    priceCents: 8990,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80",
    descriptionHtml: "<p>Listras clássicas, tecido leve e confortável.</p>",
  },
  {
    id: "bone-trucker",
    name: "Boné trucker",
    category: "Bonés",
    priceCents: 12990,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop&q=80",
    descriptionHtml:
      "<p>Boné com aba curva e tela traseira para ventilação.</p>",
  },
  {
    id: "bone-snapback",
    name: "Boné snapback",
    category: "Bonés",
    priceCents: 11990,
    image:
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=600&fit=crop&q=80",
    descriptionHtml: "<p>Ajuste snap, bordado frontal. Estilo urbano.</p>",
  },
  {
    id: "tenis-corrida",
    name: "Tênis de corrida",
    category: "Calçados",
    priceCents: 45990,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80",
    descriptionHtml:
      "<p>Amortecimento responsivo, solado em borracha. Para treinos e passeios.</p>",
  },
  {
    id: "tenis-casual",
    name: "Tênis casual",
    category: "Calçados",
    priceCents: 38990,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop&q=80",
    descriptionHtml: "<p>Design minimalista, combina com jeans ou chino.</p>",
  },
  {
    id: "oculos-aviador",
    name: "Óculos de sol aviador",
    category: "Óculos",
    priceCents: 24990,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&q=80",
    descriptionHtml:
      "<p>Lentes com proteção UV400, armação metálica leve.</p>",
  },
  {
    id: "oculos-retro",
    name: "Óculos redondo retrô",
    category: "Óculos",
    priceCents: 19990,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop&q=80",
    descriptionHtml: "<p>Estilo vintage, acetato com hastes reforçadas.</p>",
  },
  {
    id: "mochila-urbana",
    name: "Mochila urbana",
    category: "Acessórios",
    priceCents: 27990,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&q=80",
    descriptionHtml:
      "<p>Compartimento para notebook até 15&quot;, tecido repelente à água.</p>",
  },
  {
    id: "relogio-minimal",
    name: "Relógio minimalista",
    category: "Acessórios",
    priceCents: 32990,
    image:
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&h=600&fit=crop&q=80",
    descriptionHtml: "<p>Mostrador clean, pulseira em couro sintético.</p>",
  },
  {
    id: "moletom-capuz",
    name: "Moletom com capuz",
    category: "Casacos",
    priceCents: 19990,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&q=80",
    descriptionHtml: "<p>Interior felpudo, bolso canguru. Perfeito para o frio.</p>",
  },
  {
    id: "bone-linho",
    name: "Boné de linho",
    category: "Bonés",
    priceCents: 9990,
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&h=600&fit=crop&q=80",
    descriptionHtml: "<p>Tecido natural, aba curta. Visual clean.</p>",
  },
];

const byId = new Map(CATALOG.map((p) => [p.id, p]));

export function getProductById(id: string): CatalogProduct | undefined {
  return byId.get(id);
}
