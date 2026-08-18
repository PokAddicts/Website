import { NavLink } from "react-router-dom";

const HIGHLIGHTS = [
  {
    title: "All Products",
    description: "Browse everything we carry, by game and language.",
    to: "/products",
    cta: "Shop All",
  },
  {
    title: "Preorder Products",
    description: "Reserve upcoming releases across every TCG before they hit shelves.",
    to: "/products/preorders",
    cta: "View Preorders",
  },
  {
    title: "Card Restoration",
    description: "Professional cleaning, whitening & pressing — book an appointment.",
    to: "/restoration",
    cta: "Book Now",
  },
  {
    title: "Bulk & Wholesale",
    description: "Volume pricing for game shops, resellers & streamers.",
    to: "/contact",
    cta: "Get a Quote",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-gold-50 via-leaf-50/60 to-white">
        {/* generated dot-grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,rgba(185,135,26,0.35)_1px,transparent_0)] [background-size:26px_26px]"
        />
        {/* soft brand-color blobs */}
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-leaf-100 opacity-70 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-gold-100 opacity-80 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-leaf-100 opacity-50 blur-3xl" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-600">
            Trading Card Games
          </p>
          <h1 className="mx-auto max-w-3xl text-3xl font-bold text-slate-900 sm:text-5xl">
            Sealed Products, Singles, and Card Restoration —{" "}
            <span className="text-gold-500">all in one place</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500 sm:text-base">
            Reserve upcoming set releases, shop what's in stock now, book a restoration
            appointment, or reach out for bulk pricing on sealed product.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <NavLink to="/products/preorders" className="btn-primary">
              Browse Preorders
            </NavLink>
            <a href="#offerings" className="btn-secondary">
              Explore Products
            </a>
          </div>
        </div>
      </section>

      <section id="offerings" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-slate-900">What We Offer</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <div key={item.to} className="card flex flex-col p-5">
              <h3 className="font-display text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-500">{item.description}</p>
              <NavLink to={item.to} className="btn-secondary mt-4">
                {item.cta}
              </NavLink>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
