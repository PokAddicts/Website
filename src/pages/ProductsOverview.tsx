import { NavLink } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import {
  categories,
  categoryMap,
  games,
  preorderProducts,
  stockProducts,
} from "../data/products";

export default function ProductsOverview() {
  return (
    <div>
      <PageHeader
        eyebrow="Shop"
        title="Products"
        description="Browse everything we carry — preorders across every TCG combined, or shop current stock by game and language."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NavLink
            to="/products/preorders"
            className="card flex flex-col p-6 transition hover:border-gold-400 hover:shadow-md"
          >
            <span className="badge w-fit bg-gold-100 text-gold-600 ring-1 ring-inset ring-gold-400/40">
              Reserve Ahead
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-slate-900">Preorders</h3>
            <p className="mt-2 flex-1 text-sm text-slate-500">
              All upcoming releases across every TCG we carry, combined in one place.
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-400">
              {preorderProducts.length} open preorder{preorderProducts.length !== 1 ? "s" : ""}
            </p>
            <span className="btn-secondary mt-4 w-fit">Browse Preorders →</span>
          </NavLink>

          {games.map((game) => {
            const gameCategories = categories.filter((c) => c.gameSlug === game.slug);
            const count = stockProducts.filter(
              (p) => categoryMap[p.category].gameSlug === game.slug
            ).length;

            return (
              <NavLink
                key={game.slug}
                to={`/products/${game.slug}`}
                className="card flex flex-col p-6 transition hover:border-gold-400 hover:shadow-md"
              >
                <span className="badge w-fit bg-leaf-100 text-leaf-600 ring-1 ring-inset ring-leaf-400/40">
                  Current Stock
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-slate-900">{game.name}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-500">
                  Available in{" "}
                  {gameCategories
                    .map((c) => c.label.match(/\(([^)]+)\)/)?.[1] ?? c.label)
                    .join(", ")}
                  .
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-400">
                  {count} in-stock listing{count !== 1 ? "s" : ""}
                </p>
                <span className="btn-secondary mt-4 w-fit">Shop {game.name} →</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
