import { FormEvent, useState } from "react";
import PageHeader from "../components/PageHeader";

interface FormState {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  interest: string;
  estimatedQuantity: string;
  message: string;
}

const initialForm: FormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  interest: "Pokémon",
  estimatedQuantity: "",
  message: "",
};

export default function ContactUs() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: wire up to Google Sheets + Telegram bot notification.
    setSubmitted(true);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Shops & Streamers"
        title="Bulk & Wholesale Inquiries"
        description="We offer bulk pricing on sealed Pokémon and One Piece product for game shops, resellers, and streamers. Tell us what you're looking for and we'll follow up with a quote."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-5">
              <h3 className="font-semibold text-gold-600">Who this is for</h3>
              <p className="mt-2 text-sm text-slate-500">
                Local game stores, online resellers, and content creators looking for consistent
                supply of sealed booster boxes, ETBs, and specialty product at volume pricing.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gold-600">What to include</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500">
                <li>Products / sets you're interested in</li>
                <li>Estimated order quantity or monthly volume</li>
                <li>Whether this is a one-time or recurring order</li>
              </ul>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-gold-600">Direct Contact</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-500">
                <li>Email: <a href="mailto:pokaddicts@gmail.com" className="text-slate-700 hover:text-gold-600">pokaddicts@gmail.com</a></li>
                <li>Telegram: <a href="https://t.me/PokAddicts_Admin" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-gold-600">@PokAddicts_Admin</a></li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="card p-6 text-center">
                <p className="text-lg font-semibold text-gold-600">Thanks — inquiry sent!</p>
                <p className="mt-2 text-sm text-slate-500">
                  We'll review your request and get back to you at {form.email || "your email"}{" "}
                  with pricing.
                </p>
                <button
                  type="button"
                  className="btn-secondary mt-4"
                  onClick={() => {
                    setForm(initialForm);
                    setSubmitted(false);
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-5 p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="businessName">Business / Channel Name</label>
                    <input
                      id="businessName"
                      className="field-input"
                      value={form.businessName}
                      onChange={(e) => update("businessName", e.target.value)}
                      placeholder="Corner Game Shop"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="contactName">Contact Name</label>
                    <input
                      id="contactName"
                      required
                      className="field-input"
                      value={form.contactName}
                      onChange={(e) => update("contactName", e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
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
                  <div>
                    <label className="field-label" htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      className="field-input"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="(555) 555-5555"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="interest">Interested In</label>
                    <select
                      id="interest"
                      className="field-input"
                      value={form.interest}
                      onChange={(e) => update("interest", e.target.value)}
                    >
                      <option>Pokémon</option>
                      <option>One Piece</option>
                      <option>Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="field-label" htmlFor="estimatedQuantity">
                      Estimated Quantity
                    </label>
                    <input
                      id="estimatedQuantity"
                      className="field-input"
                      value={form.estimatedQuantity}
                      onChange={(e) => update("estimatedQuantity", e.target.value)}
                      placeholder="e.g. 10 booster boxes / month"
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="field-input"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us more about what you're looking for..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
