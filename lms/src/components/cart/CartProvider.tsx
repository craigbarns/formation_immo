"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/** Produit sérialisable passé du serveur (prix calculés dans catalog.ts). */
export type CartProduct = {
  id: string;
  kind: "pack" | "module";
  label: string;
  priceCents: number;
};

type CartContextValue = {
  items: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  setItems: (ids: string[]) => void;
  has: (id: string) => boolean;
  count: number;
  totalCents: number;
  products: Map<string, CartProduct>;
  packPriceCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "mpf-cart";

export function CartProvider({
  products,
  packPriceCents,
  children,
}: {
  products: CartProduct[];
  packPriceCents: number;
  children: React.ReactNode;
}) {
  const [items, setItemsState] = useState<string[]>([]);
  const productMap = useMemo(
    () => new Map(products.map((p) => [p.id, p])),
    [products]
  );

  // Le panier survit au passage par /login (localStorage).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setItemsState(
          parsed.filter((x): x is string => typeof x === "string" && productMap.has(x))
        );
      }
    } catch {
      // stockage corrompu : on repart d'un panier vide
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = useCallback((next: string[]) => {
    setItemsState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // stockage indisponible (navigation privée) : panier en mémoire seulement
    }
  }, []);

  const add = useCallback(
    (id: string) => {
      if (!productMap.has(id)) return;
      persist(items.includes(id) ? items : [...items, id]);
    },
    [items, persist, productMap]
  );

  const remove = useCallback(
    (id: string) => persist(items.filter((x) => x !== id)),
    [items, persist]
  );

  const clear = useCallback(() => persist([]), [persist]);
  const setItems = useCallback((ids: string[]) => persist(ids), [persist]);

  const totalCents = useMemo(
    () => items.reduce((sum, id) => sum + (productMap.get(id)?.priceCents ?? 0), 0),
    [items, productMap]
  );

  const value: CartContextValue = {
    items,
    add,
    remove,
    clear,
    setItems,
    has: (id) => items.includes(id),
    count: items.length,
    totalCents,
    products: productMap,
    packPriceCents,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
