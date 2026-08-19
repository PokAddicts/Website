import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProductListCard from "../components/ProductListCard";
import {
  categoryBadgeClasses,
  categoryMap,
  games,
  preorderProducts,
} from "../data/products";
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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => {
            const stockStatus =
              product.quantityAvailable !== undefined
                ? getStockStatus(product.quantityAvailable, "allocated")
                : null;
            const statusBadge = stockStatus
              ? { label: stockStatus.label, className: stockStatus.badgeClass }
              : product.limitedQty
              ? { label: "Limited Qty", className: "bg-ember-500/10 text-ember-600 ring-1 ring-inset ring-ember-500/30" }
              : null;
            return (
              <ProductListCard
                key={product.id}
                id={product.id}
                category={product.category}
                imageUrl={product.imageUrl}
                name={product.name}
                productType={product.productType}
                price={product.price}
                categoryBadge={{
                  label: categoryMap[product.category].label,
                  className: categoryBadgeClasses[product.category],
                }}
                statusBadge={statusBadge}
                soldOut={stockStatus?.soldOut}
                ctaLabel={stockStatus?.soldOut ? "Sold Out" : "View Details"}
              />
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
