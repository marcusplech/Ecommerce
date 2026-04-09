import { CATALOG, getProductById } from "@/data/products";
import { formatBRL } from "@/libs/money";
import type {
  CartLineDisplay,
  CartLineStored,
  LocalCart,
} from "@/types/shop";

export type CartSnapshot = { lines: CartLineStored[] };

const STORAGE_KEY = "ecommerce-local-cart-v1";

export function getEmptyCart(): LocalCart {
  return {
    id: "local",
    total_items: 0,
    line_items: [],
    subtotal: { formatted_with_symbol: formatBRL(0) },
  };
}

function linesToDisplay(lines: CartLineStored[]): CartLineDisplay[] {
  return lines
    .map((line): CartLineDisplay | null => {
      const product = getProductById(line.productId);
      if (!product) return null;
      const lineCents = product.priceCents * line.quantity;
      return {
        id: line.lineItemId,
        productId: line.productId,
        name: product.name,
        quantity: line.quantity,
        line_total: { formatted_with_symbol: formatBRL(lineCents) },
        media: { source: product.image },
      };
    })
    .filter((x): x is CartLineDisplay => x !== null);
}

export function snapshotToCart(snapshot: CartSnapshot | null): LocalCart {
  if (!snapshot?.lines?.length) return getEmptyCart();

  const display = linesToDisplay(snapshot.lines);
  const totalCents = display.reduce((acc, line) => {
    const p = getProductById(line.productId);
    if (!p) return acc;
    return acc + p.priceCents * line.quantity;
  }, 0);
  const totalItems = display.reduce((acc, l) => acc + l.quantity, 0);

  return {
    id: "local",
    total_items: totalItems,
    line_items: display,
    subtotal: { formatted_with_symbol: formatBRL(totalCents) },
  };
}

export function readCartSnapshot(): CartSnapshot {
  if (typeof window === "undefined") return { lines: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [] };
    const parsed = JSON.parse(raw) as CartSnapshot;
    if (!parsed?.lines || !Array.isArray(parsed.lines)) return { lines: [] };
    return { lines: parsed.lines };
  } catch {
    return { lines: [] };
  }
}

export function readLocalCart(): LocalCart {
  return snapshotToCart(readCartSnapshot());
}

export function writeCartSnapshot(snapshot: CartSnapshot): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function newLineItemId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function addLine(
  snapshot: CartSnapshot,
  productId: string,
  quantity: number
): CartSnapshot {
  const product = getProductById(productId);
  if (!product || quantity < 1) return snapshot;

  const lines = [...snapshot.lines];
  const existing = lines.find((l) => l.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    lines.push({
      lineItemId: newLineItemId(),
      productId,
      quantity,
    });
  }
  return { lines };
}

export function updateLineQty(
  snapshot: CartSnapshot,
  lineItemId: string,
  quantity: number
): CartSnapshot {
  if (quantity < 1) return snapshot;
  const lines = snapshot.lines
    .map((l) =>
      l.lineItemId === lineItemId ? { ...l, quantity } : l
    )
    .filter((l) => l.quantity > 0);
  return { lines };
}

export function removeLine(
  snapshot: CartSnapshot,
  lineItemId: string
): CartSnapshot {
  return {
    lines: snapshot.lines.filter((l) => l.lineItemId !== lineItemId),
  };
}

export function clearCart(): CartSnapshot {
  return { lines: [] };
}

/** Valida IDs de produto contra o catálogo atual (remove órfãos). */
export function sanitizeSnapshot(snapshot: CartSnapshot): CartSnapshot {
  const ids = new Set(CATALOG.map((p) => p.id));
  return {
    lines: snapshot.lines.filter((l) => ids.has(l.productId)),
  };
}
