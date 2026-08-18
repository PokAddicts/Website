import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProductImagePlaceholder from "../components/ProductImagePlaceholder";
import {
  categoryBadgeClasses,
  categoryMap,
  games,
  preorderProducts,
} from "../data/products";
import { formatPrice } from "../utils/currency";
import { formatReleaseDate } from "../utils/date";
import { getStockStatus, sortByAvailability } from "../utils/stock";

export default function PreorderProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGameSlug = searchParams.get("game");

  const filtered = useMemo(() => {
    const base = activeGameSlug
      ? preorderProducts.filter((p) => categoryMap[p.category].gameSlug === activeGameSlug)
      : preorderProducts;
    return sortByAvailability(base, (p) => p.quantityAvailable);
  }, [activeGameSlug]);

  function selectGame(slug: string | null) {
    if (slug) {
      setSearchParams({ game: slug });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Reserve Ahead"
        title="Preorder Products"
        description="Lock in upcoming sealed product releases with a deposit — across every game and language we carry. Full details on deposits and pickup/shipping are confirmed after you submit a request."
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => selectGame(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              !activeGameSlug
                ? "bg-gold-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All TCGs
          </button>
          {games.map((game) => (
            <button
              key={game.slug}
              type="button"
              onClick={() => selectGame(game.slug)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                activeGameSlug === game.slug
                  ? "bg-gold-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {game.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => {
            const stockStatus =
              product.quantityAvailable !== undefined
                ? getStockStatus(product.quantityAvailable, "allocated")
                : null;
            return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`card flex flex-col overflow-hidden transition hover:border-gold-400 hover:shadow-md ${
                stockStatus?.soldOut ? "opacity-60" : ""
              }`}
            >
              <ProductImagePlaceholder category={product.category} imageUrl={product.imageUrl} />
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`badge ${categoryBadgeClasses[product.category]}`}>
                    {categoryMap[product.category].label}
                  </span>
                  {stockStatus ? (
                    <span className={`badge ${stockStatus.badgeClass}`}>{stockStatus.label}</span>
                  ) : (
                    product.limitedQty && (
                      <span className="badge bg-ember-500/10 text-ember-600 ring-1 ring-inset ring-ember-500/30">
                        Limited Qty
                      </span>
                    )
                  )}
                </div>
                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{product.productType}</p>

                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>
                    Est. Release:{" "}
                    <span className="text-slate-700">{formatReleaseDate(product.releaseDate)}</span>
                  </p>
                  <p>
                    Deposit required:{" "}
                    <span className="text-slate-700">{product.depositPercent}%</span>
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-lg font-bold text-slate-900">
                    {formatPrice(product.price)}
                  </span>
                  <span
                    className={`pointer-events-none ${
                      stockStatus?.soldOut
                        ? "rounded-lg bg-slate-200 px-5 py-2.5 font-semibold text-slate-500"
                        : "btn-primary"
                    }`}
                  >
                    {stockStatus?.soldOut ? "Sold Out" : "View Details"}
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-slate-400">
            No preorders available for this TCG right now.
          </p>
        )}
      </div>
    </div>
  );
}
