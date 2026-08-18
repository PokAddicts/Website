import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProductImagePlaceholder from "../components/ProductImagePlaceholder";
import {
  Category,
  categories,
  categoryBadgeClasses,
  categoryMap,
  gameMap,
  stockProducts,
} from "../data/products";
import { formatPrice } from "../utils/currency";
import { getStockStatus } from "../utils/stock";

interface ProductsByGameProps {
  gameSlug: string;
}

export default function ProductsByGame({ gameSlug }: ProductsByGameProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") as Category | null;
  const gameName = gameMap[gameSlug]?.name ?? gameSlug;

  const gameCategories = useMemo(
    () => categories.filter((c) => c.gameSlug === gameSlug),
    [gameSlug]
  );

  const gameProducts = useMemo(
    () => stockProducts.filter((p) => categoryMap[p.category].gameSlug === gameSlug),
    [gameSlug]
  );

  const filtered = useMemo(
    () =>
      activeCategory
        ? gameProducts.filter((p) => p.category === activeCategory)
        : gameProducts,
    [activeCategory, gameProducts]
  );

  function selectCategory(value: Category | null) {
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Current Stock"
        title={gameName}
        description={`Sealed ${gameName} product and singles available right now, first come first served. Filter by language below.`}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => selectCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              !activeCategory
                ? "bg-gold-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Languages
          </button>
          {gameCategories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => selectCategory(c.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                activeCategory === c.value
                  ? "bg-gold-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => {
            const stockStatus = getStockStatus(product.quantityAvailable);
            return (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`card flex flex-col overflow-hidden transition hover:border-gold-400 hover:shadow-md ${
                stockStatus.soldOut ? "opacity-60" : ""
              }`}
            >
              <ProductImagePlaceholder category={product.category} imageUrl={product.imageUrl} />
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className={`badge ${categoryBadgeClasses[product.category]}`}>
                    {categoryMap[product.category].label}
                  </span>
                  <span className={`badge ${stockStatus.badgeClass}`}>{stockStatus.label}</span>
                </div>
                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{product.productType}</p>

                <div className="mt-4 flex flex-1 items-end justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="btn-primary pointer-events-none">
                    {stockStatus.soldOut ? "Sold Out" : "View Details"}
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-slate-400">
            Nothing in stock for this language right now — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
