import { FormEvent, useState } from "react";
import PageHeader from "../components/PageHeader";

const SERVICES = [
  {
    name: "Card Cleaning",
    price: "S$25",
    description: "Surface dirt, fingerprints, and grime removed while preserving the card's original finish.",
  },
  {
    name: "Pressing",
    price: "S$45",
    note: "Includes Cleaning",
    description: "For light corner lifts, warping, or dents — corrects them for a flatter, straighter card.",
  },
  {
    name: "Deep Restoration",
    price: "S$80",
    note: "Includes Cleaning",
    description: "Heavier pressing and restoration for deep bends and dents.",
  },
];

const SERVICE_OPTIONS = [
  "Card Cleaning",
  "Pressing",
  "Deep Restoration",
  "Not sure — need a recommendation",
];

const TIME_OPTIONS = ["11 AM", "1 PM", "3 PM", "5 PM"];

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  itemDescription: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  service: SERVICE_OPTIONS[0],
  itemDescription: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
};

export default function Restoration() {
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
        eyebrow="Cleaning & Restoration"
        title="Book a Restoration Appointment"
        description="Give your cards new life. Submit your details and desired service below to request an appointment — you'll be contacted to confirm timing and drop-off / shipping instructions."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Services &amp; Pricing</h2>
            <div className="mt-4 space-y-4">
              {SERVICES.map((service) => (
                <div key={service.name} className="card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-gold-600">{service.name}</h3>
                    <div className="shrink-0 text-right">
                      <div className="font-display text-base font-bold text-slate-900">{service.price}</div>
                      {service.note && <div className="text-xs text-slate-400">{service.note}</div>}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{service.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Final pricing may vary based on card condition — this is confirmed with you after
              booking.
            </p>

            <div className="mt-6 card p-4">
              <h3 className="font-semibold text-gold-600">Insurance &amp; Turnaround</h3>
              <p className="mt-1.5 text-sm text-slate-500">
                If a card is deemed to have been mishandled during our process, we'll compensate
                70% of its fair market value.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Turnaround is typically 1–2 weeks from when we receive your card, though severely
                damaged cards may take longer.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">Our Work</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center text-xs text-slate-400"
                >
                  Sample photo coming soon
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <h2 className="text-xl font-bold text-slate-900">Appointment Request</h2>

          {submitted ? (
            <div className="card mt-4 p-6 text-center">
              <p className="text-lg font-semibold text-gold-600">Request received!</p>
              <p className="mt-2 text-sm text-slate-500">
                Thanks, {form.name || "there"}. We'll reach out to confirm your appointment
                shortly.
              </p>
              <button
                type="button"
                className="btn-secondary mt-4"
                onClick={() => {
                  setForm(initialForm);
                  setSubmitted(false);
                }}
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card mt-4 space-y-5 p-6">
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

              <div className="grid gap-5 sm:grid-cols-2">
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
                <div>
                  <label className="field-label" htmlFor="service">Service Needed</label>
                  <select
                    id="service"
                    className="field-input"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                  >
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="itemDescription">
                  Card(s) / Item Description
                </label>
                <textarea
                  id="itemDescription"
                  required
                  rows={3}
                  className="field-input"
                  value={form.itemDescription}
                  onChange={(e) => update("itemDescription", e.target.value)}
                  placeholder="e.g. 1x Charizard VMAX (Champion's Path), soft corner bend"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="preferredDate">Preferred Date</label>
                  <input
                    id="preferredDate"
                    type="date"
                    required
                    className="field-input"
                    value={form.preferredDate}
                    onChange={(e) => update("preferredDate", e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="preferredTime">Preferred Time</label>
                  <select
                    id="preferredTime"
                    required
                    className="field-input"
                    value={form.preferredTime}
                    onChange={(e) => update("preferredTime", e.target.value)}
                  >
                    <option value="" disabled>
                      Select a time
                    </option>
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
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

              <button type="submit" className="btn-primary w-full sm:w-auto">
                Request Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
