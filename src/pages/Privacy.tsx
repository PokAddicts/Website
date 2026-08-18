import PageHeader from "../components/PageHeader";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: "PokAddicts (\"we\", \"us\", \"our\") respects your privacy and is committed to protecting your personal data in accordance with Singapore's Personal Data Protection Act (PDPA). This policy explains what we collect, why, and how it's used.",
  },
  {
    title: "2. What We Collect",
    body: "When you place a preorder, buy in-stock product, book a restoration appointment, or submit a bulk/wholesale inquiry, we collect the information you provide directly — typically your name, email address, phone number, and order or appointment details.",
  },
  {
    title: "3. Why We Collect It",
    body: "We use this information to process your order or appointment, communicate updates (including via email, WhatsApp, or Telegram), respond to inquiries, and generally operate the shop. We don't collect more than we need for these purposes.",
  },
  {
    title: "4. How We Use & Share It",
    body: "Your data is used only for the purposes above. We do not sell your personal data. It may be shared with service providers strictly to fulfil your order — for example, a delivery partner if you arrange your own Lalamove delivery.",
  },
  {
    title: "5. Cookies & Local Storage",
    body: "Your cart contents are stored in your browser's local storage so your cart is remembered between visits. We don't currently use third-party tracking or advertising cookies.",
  },
  {
    title: "6. Data Retention",
    body: "We retain personal data only as long as necessary to fulfil your order, keep basic accounting records, and meet any legal requirements, after which it's securely deleted or anonymized.",
  },
  {
    title: "7. Your Rights",
    body: "Under the PDPA, you may request access to, correction of, or withdrawal of consent for your personal data at any time by emailing us at pokaddicts@gmail.com.",
  },
  {
    title: "8. Security",
    body: "We take reasonable technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse.",
  },
  {
    title: "9. Changes to This Policy",
    body: "We may update this policy from time to time to reflect changes in how we operate. The latest version will always be posted on this page.",
  },
  {
    title: "10. Contact",
    body: "Questions about this policy or your personal data can be directed to pokaddicts@gmail.com.",
  },
];

export default function Privacy() {
  return (
    <div>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
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
