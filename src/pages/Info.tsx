import PageHeader from "../components/PageHeader";

const FAQ_GROUPS = [
  {
    category: "Preorders & Arrival",
    items: [
      {
        q: "How do preorders work?",
        a: "Preorders are only released once we have received guaranteed allocation. If there's any major damage to the product due to unforeseen circumstances such as shipping damage, a full refund will be applied. Do note that minor dents and tears are to be expected.",
      },
      {
        q: "What if my preorder is delayed?",
        a: "Release dates are estimates set by publishers/distributors and can shift. If there are any delays, you'll be notified via WhatsApp or updated in our Telegram channel.",
      },
      {
        q: "Why can't you give an exact arrival date?",
        a: "Arrival depends on shipping and customs clearance on our end, so listings only show an estimated window. We'll only confirm the real date once stock is physically with us, with updates posted in our Telegram channel as soon as it's ready.",
      },
      {
        q: "The official release date has passed — why hasn't my order arrived?",
        a: "Release dates are set by the publisher (e.g. The Pokémon Company, Bandai), not by us — that's simply when the set goes on sale. Since some of our stock is sourced from overseas, it can take a little longer to physically reach us than the official release day, which is why our listings show an estimated arrival window instead.",
      },
    ],
  },
  {
    category: "Stock & Collection",
    items: [
      {
        q: "Can I hold an in-stock item without paying first?",
        a: "We're not able to set items aside without payment — a product is only reserved for you once payment is confirmed.",
      },
      {
        q: "How long does card restoration take?",
        a: "Turnaround time depends on the card's condition — we'll let you know an ETA once we've received your request.",
      },
      {
        q: "Do I need to book a specific slot to collect my order?",
        a: "Preorder and stock collection can be arranged flexibly — just message us to sort out a time. Restoration is the one exception, since that runs strictly by appointment.",
      },
    ],
  },
  {
    category: "Refunds & Order Issues",
    items: [
      {
        q: "Can I cancel or get a refund if I simply change my mind?",
        a: "Once payment is made, sales are final. On our end, we'll also never raise your price even if the market value goes up before your order is fulfilled.",
      },
      {
        q: "My sealed product arrived with a scuffed box or torn shrink wrap — can I get a refund?",
        a: "Minor cosmetic marks like light scratches or shrink wrap tears don't affect what's sealed inside and can happen during packing or transit, so these aren't eligible for a refund or exchange. If outer box condition matters to you, self collection lets you check it over before taking it home.",
      },
      {
        q: "What happens if you need to cancel my order?",
        a: "This is rare, but if a supplier falls through or stock doesn't pass our checks, we'll always issue a full refund rather than leave you without either the product or your money.",
      },
    ],
  },
  {
    category: "Bulk & Wholesale",
    items: [
      {
        q: "Can I get a discount on my order?",
        a: "Our pricing already factors in sourcing and import costs, so it stays fixed for standard orders. For larger bulk orders, reach out through the Bulk & Wholesale tab and we can work out pricing.",
      },
      {
        q: "Do streamers get special pricing?",
        a: "There's no separate streamer rate, but the same bulk-order terms apply — get in touch via Bulk & Wholesale to discuss a quote for larger volumes.",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        q: "Do you ship internationally?",
        a: "Shipping availability and rates depend on your location — reach out via the Bulk & Wholesale contact form or email us and we'll confirm.",
      },
    ],
  },
];

const POLICIES = [
  {
    title: "Payment",
    body: "Payment details are confirmed per order. Preorders require a deposit up front.",
  },
  {
    title: "Collection",
    body: "Local orders are self collection only; Lalamove can be arranged by the buyer at the buyer's own expense.",
  },
  {
    title: "Restoration Drop-off",
    body: "Cards can be shipped in or dropped off by appointment. Please don't send items before your appointment is confirmed.",
  },
];

export default function Info() {
  return (
    <div>
      <PageHeader
        eyebrow="About Us"
        title="Info"
        description="Everything you need to know about ordering, restoration bookings, and how PokAddicts operates."
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900">About PokAddicts</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            PokAddicts is a trading card game shop specializing in sealed product preorders,
            in-stock singles and sealed goods, bulk pricing for shops and streamers, and
            professional card cleaning &amp; restoration. Everything is booked and tracked right
            here on the site.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Policies</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {POLICIES.map((p) => (
              <div key={p.title} className="card p-4">
                <h3 className="font-semibold text-gold-600">{p.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
          <div className="mt-4 space-y-8">
            {FAQ_GROUPS.map((group) => (
              <div key={group.category}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {group.category}
                </h3>
                <div className="mt-2 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                  {group.items.map((item) => (
                    <details key={item.q} className="group p-4 open:bg-slate-50">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-800">
                        {item.q}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </summary>
                      <p className="mt-2 text-sm text-slate-500">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
