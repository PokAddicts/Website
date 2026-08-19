import { Link } from "react-router-dom";
import ProductImagePlaceholder from "./ProductImagePlaceholder";
import { Category } from "../data/products";
import { formatPrice } from "../utils/currency";

interface Badge {
  label: string;
  className: string;
}

interface ProductListCardProps {
  id: string;
  category: Category;
  imageUrl?: string;
  name: string;
  productType: string;
  price: number;
  categoryBadge: Badge;
  statusBadge?: Badge | null;
  soldOut?: boolean;
  ctaLabel: string;
}

// Compact horizontal row on mobile (small thumbnail + info) so multiple
// products fit on screen at once; a fuller vertical card once the grid
// widens at sm+.
export default function ProductListCard({
  id,
  category,
  imageUrl,
  name,
  productType,
  price,
  categoryBadge,
  statusBadge,
  soldOut,
  ctaLabel,
}: ProductListCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className={`card flex items-center gap-3 p-3 transition hover:border-gold-400 hover:shadow-md sm:block sm:overflow-hidden sm:p-0 ${
        soldOut ? "opacity-60" : ""
      }`}
    >
      <ProductImagePlaceholder
        category={category}
        imageUrl={imageUrl}
        className="h-16 w-16 shrink-0 rounded-lg sm:aspect-[4/3] sm:h-auto sm:w-full sm:shrink sm:rounded-none sm:rounded-t-xl sm:border-b sm:border-slate-200"
      />
      <div className="min-w-0 flex-1 sm:p-4">
        <div className="flex flex-wrap items-center gap-1.5 sm:mb-2">
          <span className={`badge ${categoryBadge.className}`}>{categoryBadge.label}</span>
          {statusBadge && <span className={`badge ${statusBadge.className}`}>{statusBadge.label}</span>}
        </div>
        <h3 className="truncate text-sm font-semibold text-slate-900 sm:mt-1 sm:whitespace-normal sm:text-base">
          {name}
        </h3>
        <p className="hidden text-sm text-slate-500 sm:mt-1 sm:block">{productType}</p>
        <div className="mt-1 flex items-center justify-between sm:mt-4">
          <span className="text-sm font-bold text-slate-900 sm:text-lg">{formatPrice(price)}</span>
          <span
            className={`hidden sm:inline-flex ${
              soldOut ? "rounded-lg bg-slate-200 px-5 py-2.5 font-semibold text-slate-500" : "btn-primary"
            }`}
          >
            {ctaLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
