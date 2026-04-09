import { CartView } from "@/components/cart-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Revise os itens antes de finalizar a compra.",
};

export default function CartPage() {
  return <CartView />;
}
