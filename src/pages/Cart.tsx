import { NavLink, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProductImagePlaceholder from "../components/ProductImagePlaceholder";
import { useCart } from "../context/CartContext";
import { categoryMap, getProductById } from "../data/products";
import { formatPrice } from "../utils/currency";
import { getStockStatus } from "../utils/stock";

export default function Cart() {
  const cart = useCart();
  const navigate = useNavigate();

  const lines = cart.items
    .map((line) => {
      const entry = getProductById(line.id);
      if (!entry) return null;
      return { line, ...entry };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const hasPreorderLine = lines.some((l) => l.kind === "preorder");
  const hasSoldOutLine = lines.some(
    (l) => l.kind === "stock" && getStockStatus(l.product.quantityAvailable).soldOut
  );
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.line.quantity, 0);

  if (lines.length === 0) {
    return (
      <div>
        <PageHeader eyebrow="Your Order" title="Cart" />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            Your cart is empty — browse our preorders and current stock to find something for
            your collection.
          </p>
          <NavLink to="/products" className="btn-primary mt-6 inline-flex">
            Browse Products
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Your Order" title="Cart" />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-4">
        {lines.map(({ line, kind, product }) => {
          const maxQuantity = kind === "stock" ? product.quantityAvailable : 99;
          const stockStatus = kind === "stock" ? getStockStatus(product.quantityAvailable) : null;
          return (
            <div key={line.id} className="card flex gap-4 p-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                <ProductImagePlaceholder category={product.category} imageUrl={product.imageUrl} />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <NavLink to={`/product/${product.id}`} className="font-semibold text-slate-900 hover:text-gold-600">
                      {product.name}
                    </NavLink>
                    <p className="text-xs text-slate-400">{categoryMap[product.category].label}</p>
                    {stockStatus?.soldOut && (
                      <span className={`badge mt-1 ${stockStatus.badgeClass}`}>{stockStatus.label}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => cart.removeItem(line.id)}
                    className="text-xs font-semibold text-slate-400 hover:text-ember-600"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-auto flex items-end justify-between pt-3">
                  <div className="flex items-center rounded-lg border border-slate-300">
                    <button
                      type="button"
                      className="px-2.5 py-1 text-slate-600 hover:text-gold-600 disabled:opacity-40"
                      onClick={() => cart.updateQuantity(line.id, Math.max(1, line.quantity - 1))}
                      disabled={line.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      className="px-2.5 py-1 text-slate-600 hover:text-gold-600 disabled:opacity-40"
                      onClick={() =>
                        cart.updateQuantity(line.id, Math.min(maxQuantity, line.quantity + 1))
                      }
                      disabled={line.quantity >= maxQuantity}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(product.price * line.quantity)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card mt-6 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Subtotal</span>
          <span className="text-xl font-bold text-slate-900">{formatPrice(subtotal)}</span>
        </div>
        {hasPreorderLine && (
          <p className="mt-2 text-xs text-slate-400">
            Cart includes preorder item(s) — only the deposit is due now, with the balance due
            once stock arrives. This is broken down at checkout.
          </p>
        )}
        {hasSoldOutLine && (
          <p className="mt-2 text-xs font-medium text-ember-600">
            One or more items in your cart are sold out — remove them to continue.
          </p>
        )}
        <button
          type="button"
          disabled={hasSoldOutLine}
          className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
      </div>
    </div>
  );
}
