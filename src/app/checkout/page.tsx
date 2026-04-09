import { CheckoutFlow } from "@/components/checkout-flow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Endereço de entrega e confirmação do pedido (demonstração).",
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
