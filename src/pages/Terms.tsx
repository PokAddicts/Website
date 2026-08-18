import PageHeader from "../components/PageHeader";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By using this site, placing an order, or booking an appointment with PokAddicts, you agree to these Terms of Service.",
  },
  {
    title: "2. Products & Pricing",
    body: "All prices are listed in Singapore Dollars (SGD) and are subject to change without notice. Product availability is not guaranteed until an order is confirmed, and we reserve the right to limit quantities per order.",
  },
  {
    title: "3. Preorders",
    body: "Preorders are only confirmed once we have received guaranteed allocation from our suppliers. A deposit is required to secure your order, with any balance due once stock arrives. Release and arrival dates shown on listings are estimates set by publishers/distributors and may shift.",
  },
  {
    title: "4. Payments",
    body: "Payment details are confirmed per order. All sales are final once payment is made.",
  },
  {
    title: "5. Refund Policy",
    body: "Strictly no refunds once an order is placed. Refunds are only issued if an item is confirmed damaged after our own quality control check. Minor cosmetic wear — such as light dents, tears, or shrink-wrap marks — is to be expected and is not grounds for a refund or exchange.",
  },
  {
    title: "6. Collection & Shipping",
    body: "Local orders are self collection only, by appointment. Lalamove delivery can be arranged by the buyer at the buyer's own expense. International shipping is available on a case-by-case basis — contact us for a quote before placing an order.",
  },
  {
    title: "7. Card Restoration Services",
    body: "Restoration services (cleaning, pressing, deep restoration) are priced based on the card's condition, with final pricing confirmed after booking. Turnaround is typically 1–2 weeks from when we receive your card, though severely damaged cards may take longer. If a card is deemed to have been mishandled during our process, we provide 70% of its fair market value as compensation.",
  },
  {
    title: "8. Bulk & Wholesale Orders",
    body: "Bulk pricing is offered at our discretion for qualifying order volumes from shops, resellers, and streamers. Terms for bulk orders are confirmed directly with the buyer.",
  },
  {
    title: "9. Intellectual Property",
    body: "Pokémon, One Piece, and other featured trademarks and copyrights are the property of their respective owners (including The Pokémon Company and Bandai Namco). PokAddicts is an independent retailer and is not affiliated with, endorsed by, or sponsored by these companies.",
  },
  {
    title: "10. Limitation of Liability",
    body: "To the extent permitted by law, PokAddicts is not liable for any indirect or consequential loss arising from your use of this site or our services.",
  },
  {
    title: "11. Governing Law",
    body: "These terms are governed by the laws of Singapore.",
  },
  {
    title: "12. Changes to These Terms",
    body: "We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.",
  },
  {
    title: "13. Contact",
    body: "Questions about these terms can be directed to pokaddicts@gmail.com.",
  },
];

export default function Terms() {
  return (
    <div>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: 18 August 2026"
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
