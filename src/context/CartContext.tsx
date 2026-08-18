import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export interface CartLine {
  id: string;
  kind: "preorder" | "stock";
  quantity: number;
}

interface CartState {
  items: CartLine[];
}

type CartAction =
  | { type: "add"; id: string; kind: "preorder" | "stock"; quantity: number }
  | { type: "updateQuantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "hydrate"; items: CartLine[] };

const STORAGE_KEY = "pokaddicts_cart";

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items };
    case "add": {
      const existing = state.items.find((line) => line.id === action.id);
      if (existing) {
        return {
          items: state.items.map((line) =>
            line.id === action.id
              ? { ...line, quantity: line.quantity + action.quantity }
              : line
          ),
        };
      }
      return {
        items: [...state.items, { id: action.id, kind: action.kind, quantity: action.quantity }],
      };
    }
    case "updateQuantity":
      return {
        items: state.items.map((line) =>
          line.id === action.id ? { ...line, quantity: action.quantity } : line
        ),
      };
    case "remove":
      return { items: state.items.filter((line) => line.id !== action.id) };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartLine[];
  itemCount: number;
  addItem: (id: string, kind: "preorder" | "stock", quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const items = JSON.parse(raw) as CartLine[];
        dispatch({ type: "hydrate", items });
      } catch {
        // ignore corrupt cart data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      itemCount: state.items.reduce((sum, line) => sum + line.quantity, 0),
      addItem: (id, kind, quantity) => dispatch({ type: "add", id, kind, quantity }),
      updateQuantity: (id, quantity) => dispatch({ type: "updateQuantity", id, quantity }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clearCart: () => dispatch({ type: "clear" }),
    }),
    [state.items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
