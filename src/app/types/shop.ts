export type CatalogProduct = {
  id: string;
  name: string;
  descriptionHtml: string;
  priceCents: number;
  image: string;
  category: string;
};

export type CartLineStored = {
  lineItemId: string;
  productId: string;
  quantity: number;
};

export type CartLineDisplay = {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  line_total: { formatted_with_symbol: string };
  media?: { source?: string };
};

export type LocalCart = {
  id: "local";
  total_items: number;
  line_items: CartLineDisplay[];
  subtotal: { formatted_with_symbol: string };
};
