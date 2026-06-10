import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  qty: number;
  custom?: CustomDesign;
};

export type CustomDesign = {
  productType: string;
  material: string;
  materialPrice: number;
  color: string;
  text?: string;
  font?: string;
  textColor?: string;
  imageUrl?: string;
  symbol?: string;
  placement: string;
  extras: { label: string; price: number }[];
};

export type Address = {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  line1: string;
  line2?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault?: boolean;
};

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  address: Address;
  paymentMethod: string;
  shippingMethod: string;
  placedAt: string;
  estimatedDelivery: string;
  status: "Placed" | "Confirmed" | "Processing" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered";
};

export type SavedDesign = CustomDesign & { id: string; name: string; price: number; createdAt: string };

type State = {
  cart: CartItem[];
  wishlist: string[]; // product slugs
  addresses: Address[];
  orders: Order[];
  designs: SavedDesign[];
};

type Ctx = State & {
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  inWishlist: (slug: string) => boolean;
  addAddress: (a: Omit<Address, "id">) => Address;
  updateAddress: (id: string, a: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  placeOrder: (o: Omit<Order, "id" | "placedAt" | "status">) => Order;
  saveDesign: (d: Omit<SavedDesign, "id" | "createdAt">) => void;
  removeDesign: (id: string) => void;
};

const StoreContext = createContext<Ctx | null>(null);

const KEY = "2mendevs:v1";

const empty: State = { cart: [], wishlist: [], addresses: [], orders: [], designs: [] };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setState({ ...empty, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state, ready]);

  const value: Ctx = {
    ...state,
    addToCart: (item) =>
      setState((s) => {
        const existing = s.cart.find(
          (c) => c.slug === item.slug && c.size === item.size && c.color === item.color && !c.custom && !item.custom,
        );
        if (existing) {
          return { ...s, cart: s.cart.map((c) => (c.id === existing.id ? { ...c, qty: c.qty + item.qty } : c)) };
        }
        return { ...s, cart: [...s.cart, { ...item, id: crypto.randomUUID() }] };
      }),
    removeFromCart: (id) => setState((s) => ({ ...s, cart: s.cart.filter((c) => c.id !== id) })),
    updateQty: (id, qty) =>
      setState((s) => ({ ...s, cart: s.cart.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c)) })),
    clearCart: () => setState((s) => ({ ...s, cart: [] })),
    toggleWishlist: (slug) =>
      setState((s) => ({
        ...s,
        wishlist: s.wishlist.includes(slug) ? s.wishlist.filter((x) => x !== slug) : [...s.wishlist, slug],
      })),
    inWishlist: (slug) => state.wishlist.includes(slug),
    addAddress: (a) => {
      const addr: Address = { ...a, id: crypto.randomUUID() };
      setState((s) => ({
        ...s,
        addresses: [
          ...s.addresses.map((x) => (addr.isDefault ? { ...x, isDefault: false } : x)),
          { ...addr, isDefault: addr.isDefault || s.addresses.length === 0 },
        ],
      }));
      return addr;
    },
    updateAddress: (id, a) =>
      setState((s) => ({ ...s, addresses: s.addresses.map((x) => (x.id === id ? { ...x, ...a } : x)) })),
    removeAddress: (id) => setState((s) => ({ ...s, addresses: s.addresses.filter((x) => x.id !== id) })),
    setDefaultAddress: (id) =>
      setState((s) => ({ ...s, addresses: s.addresses.map((x) => ({ ...x, isDefault: x.id === id })) })),
    placeOrder: (o) => {
      const order: Order = {
        ...o,
        id: "ORD" + Math.floor(100000 + Math.random() * 900000),
        placedAt: new Date().toISOString(),
        status: "Placed",
      };
      setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }));
      return order;
    },
    saveDesign: (d) =>
      setState((s) => ({
        ...s,
        designs: [{ ...d, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...s.designs],
      })),
    removeDesign: (id) => setState((s) => ({ ...s, designs: s.designs.filter((d) => d.id !== id) })),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const cartSubtotal = (cart: CartItem[]) => cart.reduce((sum, c) => sum + c.price * c.qty, 0);
export const cartCount = (cart: CartItem[]) => cart.reduce((sum, c) => sum + c.qty, 0);
