import { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavDropdownItem {
  label: string;
  to: string;
}

interface NavDropdownProps {
  label: string;
  to: string;
  items: NavDropdownItem[];
  activeMatch: string;
}

export default function NavDropdown({ label, to, items, activeMatch }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();
  const isActive = location.pathname.startsWith(activeMatch);

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div className="relative flex items-center" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <NavLink
        to={to}
        className={[
          "rounded-md py-2 pl-3 text-sm font-semibold transition",
          isActive ? "text-gold-400" : "text-slate-300 hover:text-gold-400",
        ].join(" ")}
        onClick={() => setOpen(false)}
      >
        {label}
      </NavLink>
      <button
        type="button"
        aria-label={`Toggle ${label} menu`}
        aria-expanded={open}
        className={[
          "rounded-md py-2 pr-2 pl-0.5 transition",
          isActive ? "text-gold-400" : "text-slate-300 hover:text-gold-400",
        ].join(" ")}
        onClick={() => setOpen((v) => !v)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="block px-4 py-2.5 text-sm text-slate-700 transition hover:bg-gold-50 hover:text-gold-600"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
