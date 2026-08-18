import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductImagePlaceholder from "../components/ProductImagePlaceholder";
import { useCart } from "../context/CartContext";
import { categoryBadgeClasses, categoryMap, getProductById } from "../data/products";
import { formatPrice } from "../utils/currency";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const entry = id ? getProductById(id) : undefined;
  if (!entry) return <NotFound />;

  const { kind, product } = entry;
  const category = categoryMap[product.category];
  const maxQuantity = kind === "stock" ? product.quantityAvailable : 99;

  function clampQuantity(value: number) {
    return Math.max(1, Math.min(maxQuantity, value));
  }

  function handleAddToCart() {
    cart.addItem(product.id, kind, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    navigate("/checkout", { state: { id: product.id, kind, quantity } });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card overflow-hidden">
          <ProductImagePlaceholder category={product.category} imageUrl={product.imageUrl} />
        </div>

        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`badge ${categoryBadgeClasses[product.category]}`}>
              {category.label}
            </span>
            {kind === "preorder" && product.limitedQty && (
              <span className="badge bg-ember-500/10 text-ember-600 ring-1 ring-inset ring-ember-500/30">
                Limited Qty
              </span>
            )}
            {kind === "stock" && (
              <span
                className={`badge ${
                  product.quantityAvailable > 5
                    ? "bg-leaf-100 text-leaf-600 ring-1 ring-inset ring-leaf-400/40"
                    : "bg-ember-500/10 text-ember-600 ring-1 ring-inset ring-ember-500/30"
                }`}
              >
                {product.quantityAvailable} in stock
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-slate-500">{product.productType}</p>

          {kind === "preorder" ? (
            <div className="mt-4 space-y-1 text-sm text-slate-500">
              <p>
                Est. Release:{" "}
                <span className="text-slate-700">
                  {new Date(product.releaseDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
              <p>
                Deposit required: <span className="text-slate-700">{product.depositPercent}%</span>
              </p>
            </div>
          ) : null}

          <p className="mt-4 text-2xl font-bold text-slate-900">{formatPrice(product.price)}</p>

          {product.description && (
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.description}</p>
          )}

          <div className="card mt-6 p-4">
            <h2 className="text-sm font-semibold text-gold-600">
              {kind === "preorder" ? "Terms for This Preorder" : "Order Terms"}
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-500">
              {kind === "preorder" && (
                <li>
                  Release dates are estimates — shipping and arrival timelines may shift due to
                  publisher/distributor delays.
                </li>
              )}
              <li>Minor cosmetic dents, tears, or shrink-wrap marks are to be expected and are not grounds for a claim.</li>
              <li className="font-medium text-slate-700">
                Strictly no refunds once an order is placed.
              </li>
              <li>
                Refunds are only issued if the item is confirmed damaged after our own quality
                control check.
              </li>
            </ul>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="field-label mb-0">Quantity</span>
            <div className="flex items-center rounded-lg border border-slate-300">
              <button
                type="button"
                className="px-3 py-2 text-slate-600 hover:text-gold-600 disabled:opacity-40"
                onClick={() => setQuantity((q) => clampQuantity(q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[2.5rem] text-center text-sm font-semibold text-slate-900">
                {quantity}
              </span>
              <button
                type="button"
                className="px-3 py-2 text-slate-600 hover:text-gold-600 disabled:opacity-40"
                onClick={() => setQuantity((q) => clampQuantity(q + 1))}
                disabled={quantity >= maxQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            {kind === "stock" && (
              <span className="text-xs text-slate-400">{maxQuantity} available</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={handleAddToCart}>
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <button type="button" className="btn-primary" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
