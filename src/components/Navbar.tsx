import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import { games } from "../data/products";
import { useCart } from "../context/CartContext";
import SingaporeFlagIcon from "./icons/SingaporeFlagIcon";

const PRODUCT_ITEMS = [
  { label: "Preorders", to: "/products/preorders" },
  ...games.map((g) => ({ label: g.name, to: `/products/${g.slug}` })),
];

const SIMPLE_LINKS = [
  { to: "/restoration", label: "Restoration" },
  { to: "/contact", label: "Bulk & Wholesale" },
  { to: "/info", label: "Info" },
];

function linkClasses({ isActive }: { isActive: boolean }) {
  return [
    "rounded-md px-3 py-2 text-sm font-semibold transition",
    isActive ? "text-gold-400" : "text-slate-300 hover:text-gold-400",
  ].join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <div className="h-12 w-12 overflow-hidden rounded-full p-1 ring-1 ring-white/10">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="PokAddicts TCG" className="h-full w-full rounded-full object-cover" />
          </div>
          <span className="font-brand text-lg font-extrabold uppercase tracking-normal text-white">
            PokAddicts <span className="text-gold-400">TCG</span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClasses}>
            Home
          </NavLink>
          <NavDropdown label="Products" to="/products" items={PRODUCT_ITEMS} activeMatch="/products" />
          {SIMPLE_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className="hidden items-center gap-1 rounded-full border border-ink-800 px-2 py-1 text-xs font-semibold text-slate-300 sm:inline-flex"
            title="Prices shown in Singapore Dollars"
          >
            <SingaporeFlagIcon className="h-3.5 w-auto rounded-[1px]" /> SGD
          </span>

          <NavLink
            to="/search"
            className="rounded-md p-2 text-slate-300 transition hover:bg-ink-800 hover:text-gold-400"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </NavLink>

          <NavLink
            to="/cart"
            className="relative rounded-md p-2 text-slate-300 transition hover:bg-ink-800 hover:text-gold-400"
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h1.5l1.7 10.2a1.5 1.5 0 001.48 1.3h8.44a1.5 1.5 0 001.48-1.24l1.15-6.51a.75.75 0 00-.74-.87H6" />
              <circle cx="9.5" cy="19.5" r="1.25" fill="currentColor" stroke="none" />
              <circle cx="16.5" cy="19.5" r="1.25" fill="currentColor" stroke="none" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold leading-none text-ink-950">
                {itemCount}
              </span>
            )}
          </NavLink>

          <div className="hidden md:block">
            <NavLink to="/restoration" className="btn-primary">
              Book Restoration
            </NavLink>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:bg-ink-800 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink-800 bg-ink-950 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            <NavLink to="/" end className={linkClasses} onClick={() => setOpen(false)}>
              Home
            </NavLink>

            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-ink-800"
                onClick={() => setMobileProductsOpen((v) => !v)}
              >
                Products
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition ${mobileProductsOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {mobileProductsOpen && (
                <div className="ml-3 flex flex-col gap-0.5 border-l border-ink-800 pl-3">
                  <NavLink
                    to="/products"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-ink-800"
                    onClick={() => setOpen(false)}
                  >
                    All Products
                  </NavLink>
                  {PRODUCT_ITEMS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-ink-800"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {SIMPLE_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClasses}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/restoration" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              Book Restoration
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
