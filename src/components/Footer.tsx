import { NavLink } from "react-router-dom";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-start lg:gap-x-16 lg:px-8">
        <div className="lg:max-w-xs">
          <div className="flex items-center gap-2.5">
            <div className="h-11 w-11 overflow-hidden rounded-full border border-slate-200 p-1">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="PokAddicts TCG" className="h-full w-full rounded-full object-cover" />
            </div>
            <span className="font-brand text-base font-extrabold uppercase tracking-normal text-slate-900">
              PokAddicts <span className="text-gold-500">TCG</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-500">
            Sealed TCG products. Preorders, in-stock singles &amp; sealed product, bulk pricing
            for shops and streamers, and professional card restoration.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:gap-x-16">
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-900">
              Explore
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><NavLink to="/products" className="hover:text-gold-600">All Products</NavLink></li>
              <li><NavLink to="/products/preorders" className="hover:text-gold-600">Preorders</NavLink></li>
              <li><NavLink to="/restoration" className="hover:text-gold-600">Card Restoration</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-gold-600">Bulk &amp; Wholesale</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-900">
              Visit Us
            </h3>
            <div className="mt-3 space-y-2 text-sm text-slate-500">
              <p>20 Upper Circular Road, #01-35</p>
              <p>Singapore 058416</p>
              <p className="font-medium text-slate-700">Strictly Appointment Based Only</p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-900">
              Get in Touch
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>Email: <a href="mailto:pokaddicts@gmail.com" className="hover:text-gold-600">pokaddicts@gmail.com</a></li>
            </ul>
            <SocialLinks className="mt-3" />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} PokAddicts TCG. All Rights reserved.</p>
        <div className="mt-1.5 flex items-center justify-center gap-3">
          <NavLink to="/privacy" className="hover:text-gold-600">Privacy Policy</NavLink>
          <span aria-hidden>·</span>
          <NavLink to="/terms" className="hover:text-gold-600">Terms of Service</NavLink>
        </div>
      </div>
    </footer>
  );
}
