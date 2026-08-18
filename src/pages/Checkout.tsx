import { FormEvent, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useCart } from "../context/CartContext";
import { categoryMap, getProductById } from "../data/products";
import { formatPrice } from "../utils/currency";

interface BuyNowState {
  id: string;
  kind: "preorder" | "stock";
  quantity: number;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const initialForm: FormState = { name: "", email: "", phone: "", notes: "" };

export default function Checkout() {
  const location = useLocation();
  const cart = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const buyNowItem = location.state as BuyNowState | null;
  const isBuyNow = Boolean(buyNowItem);

  const lines = (isBuyNow ? [buyNowItem as BuyNowState] : cart.items)
    .map((line) => {
      const entry = getProductById(line.id);
      if (!entry) return null;
      return { line, ...entry };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const total = lines.reduce((sum, l) => sum + l.product.price * l.line.quantity, 0);
  const depositDue = lines.reduce((sum, l) => {
    if (l.kind === "preorder") {
      return sum + l.product.price * l.line.quantity * (l.product.depositPercent / 100);
    }
    return sum + l.product.price * l.line.quantity;
  }, 0);
  const hasPreorderLine = lines.some((l) => l.kind === "preorder");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    // TODO: wire up to HitPay Payment Link + Google Sheets + Telegram bot notification.
    if (!isBuyNow) cart.clearCart();
    setSubmitted(true);
  }

  if (lines.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Nothing to check out</h1>
        <p className="mt-2 text-sm text-slate-500">Your cart is empty.</p>
        <NavLink to="/products" className="btn-primary mt-6 inline-flex">
          Browse Products
        </NavLink>
      </div>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Almost There" title="Checkout" />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="card p-6 text-center">
            <p className="text-lg font-semibold text-gold-600">Order request received!</p>
            <p className="mt-2 text-sm text-slate-500">
              Thanks, {form.name || "there"}. We'll reach out at {form.email || "your email"} to
              confirm payment and next steps.
            </p>
            <NavLink to="/products" className="btn-secondary mt-4 inline-flex">
              Continue Shopping
            </NavLink>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
              <div className="mt-3 space-y-3">
                {lines.map(({ line, kind, product }) => (
                  <div key={line.id} className="card p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-400">
                          {categoryMap[product.category].label} · Qty {line.quantity}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-slate-900">
                        {formatPrice(product.price * line.quantity)}
                      </span>
                    </div>
                    {kind === "preorder" && (
                      <p className="mt-1.5 text-xs text-slate-400">
                        {product.depositPercent}% deposit due now, balance on arrival.
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="card mt-4 space-y-1.5 p-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Order total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-slate-900">
                  <span>Due now</span>
                  <span>{formatPrice(depositDue)}</span>
                </div>
                {hasPreorderLine && (
                  <p className="pt-1 text-xs text-slate-400">
                    Preorder balances are collected once stock arrives.
                  </p>
                )}
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Local orders are self collection only; Lalamove can be arranged by the buyer at
                the buyer's own expense.
              </p>
            </div>

            <div className="lg:col-span-3">
              <h2 className="text-lg font-bold text-slate-900">Your Details</h2>
              <form onSubmit={handleSubmit} className="card mt-3 space-y-5 p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      required
                      className="field-input"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="field-input"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className="field-input"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <label className="field-label" htmlFor="notes">Additional Notes</label>
                  <textarea
                    id="notes"
                    rows={2}
                    className="field-input"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Anything else we should know?"
                  />
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-slate-800">Terms &amp; Conditions</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs text-slate-500">
                    <li>Release/arrival timelines are estimates and may shift.</li>
                    <li>Minor cosmetic dents, tears, or shrink-wrap marks are to be expected.</li>
                    <li className="font-medium text-slate-700">Strictly no refunds once an order is placed.</li>
                    <li>Refunds are only issued if the item is confirmed damaged after our own quality control check.</li>
                  </ul>
                  <label className="mt-3 flex items-start gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
                    />
                    <span>
                      I have read and agree to the{" "}
                      <NavLink to="/terms" target="_blank" className="text-gold-600 hover:underline">
                        "Terms of Service"
                      </NavLink>{" "}
                      and{" "}
                      <NavLink to="/privacy" target="_blank" className="text-gold-600 hover:underline">
                        "Privacy Policy"
                      </NavLink>
                      .
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreed}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
