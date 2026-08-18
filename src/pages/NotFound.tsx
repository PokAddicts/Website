import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">404 — Page not found</h1>
      <p className="mt-2 text-slate-500">The page you're looking for doesn't exist.</p>
      <NavLink to="/" className="btn-primary mt-6">
        Back to Home
      </NavLink>
    </div>
  );
}
