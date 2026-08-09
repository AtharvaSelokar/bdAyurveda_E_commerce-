"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "bd-ayurveda-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsed = JSON.parse(savedCart) as CartItem[];

        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error("Unable to load cart:", error);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [items, hasLoaded]);

  const addItem = (
    item: Omit<CartItem, "quantity">,
    quantity: number = 1,
  ) => {
    const safeQuantity = Math.max(1, quantity);

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.slug === item.slug,
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.slug === item.slug
            ? {
                ...cartItem,
                quantity: cartItem.quantity + safeQuantity,
              }
            : cartItem,
        );
      }

      return [...currentItems, { ...item, quantity: safeQuantity }];
    });
  };

  const removeItem = (slug: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.slug !== slug),
    );
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.slug === slug ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [items],
  );

  const value: CartContextValue = {
    items,
    cartCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
