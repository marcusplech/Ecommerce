"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addLine,
  clearCart,
  readCartSnapshot,
  removeLine,
  sanitizeSnapshot,
  snapshotToCart,
  updateLineQty,
  writeCartSnapshot,
  type CartSnapshot,
} from "@/libs/cart-storage";

export const cartQueryKey = ["cart"] as const;

function persistAndReturn(snapshot: CartSnapshot) {
  const clean = sanitizeSnapshot(snapshot);
  writeCartSnapshot(clean);
  return snapshotToCart(clean);
}

export function useCart() {
  return useQuery({
    queryKey: cartQueryKey,
    queryFn: async () => {
      await Promise.resolve();
      return persistAndReturn(readCartSnapshot());
    },
    staleTime: 0,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const snap = readCartSnapshot();
      const next = addLine(snap, productId, quantity);
      return persistAndReturn(next);
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(cartQueryKey, cart);
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      lineItemId,
      quantity,
    }: {
      lineItemId: string;
      quantity: number;
    }) => {
      const snap = readCartSnapshot();
      const next = updateLineQty(snap, lineItemId, quantity);
      return persistAndReturn(next);
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(cartQueryKey, cart);
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lineItemId: string) => {
      const snap = readCartSnapshot();
      const next = removeLine(snap, lineItemId);
      return persistAndReturn(next);
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(cartQueryKey, cart);
    },
  });
}

export function useEmptyCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const next = clearCart();
      return persistAndReturn(next);
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(cartQueryKey, cart);
    },
  });
}
