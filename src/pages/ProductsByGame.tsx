import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProductListCard from "../components/ProductListCard";
import {
  Category,
  categories,
  categoryBadgeClasses,
  categoryMap,
  gameMap,
  stockProducts,
} from "../data/products";
import { getStockStatus, sortByAvailability } from "../utils/stock";

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

  const filtered = useMemo(() => {
    const base = activeCategory
      ? gameProducts.filter((p) => p.category === activeCategory)
      : gameProducts;
    return sortByAvailability(base, (p) => p.quantityAvailable);
  }, [activeCategory, gameProducts]);

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

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => {
            const stockStatus = getStockStatus(product.quantityAvailable);
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
                statusBadge={{ label: stockStatus.label, className: stockStatus.badgeClass }}
                soldOut={stockStatus.soldOut}
                ctaLabel={stockStatus.soldOut ? "Sold Out" : "View Details"}
              />
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
