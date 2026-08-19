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

// Mobile: minimal — image, name, price, and a compact status pill (matches
// the "browse fast, tap for detail" pattern of most TCG shop apps). Desktop
// (sm+): the fuller card with category/status badges and product type.
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
      className={`card flex flex-col overflow-hidden transition hover:border-gold-400 hover:shadow-md ${
        soldOut ? "opacity-60" : ""
      }`}
    >
      <ProductImagePlaceholder
        category={category}
        imageUrl={imageUrl}
        className="aspect-square w-full sm:aspect-[4/3] sm:rounded-t-xl sm:border-b sm:border-slate-200"
      />

      <div className="flex flex-1 flex-col p-2.5 sm:hidden">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{name}</h3>
        <span className="mt-auto pt-2 text-sm font-bold text-slate-900">{formatPrice(price)}</span>
        <span
          className={`mt-2 w-full rounded-lg py-1.5 text-center text-xs font-semibold ${
            soldOut ? "bg-slate-200 text-slate-500" : "bg-gold-500 text-white"
          }`}
        >
          {ctaLabel}
        </span>
      </div>

      <div className="hidden flex-1 flex-col p-4 sm:flex">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className={`badge ${categoryBadge.className}`}>{categoryBadge.label}</span>
          {statusBadge && <span className={`badge ${statusBadge.className}`}>{statusBadge.label}</span>}
        </div>
        <h3 className="font-semibold text-slate-900">{name}</h3>
        <p className="mt-1 text-sm text-slate-500">{productType}</p>
        <div className="mt-4 flex flex-1 items-end justify-between">
          <span className="text-lg font-bold text-slate-900">{formatPrice(price)}</span>
          <span
            className={
              soldOut
                ? "rounded-lg bg-slate-200 px-5 py-2.5 font-semibold text-slate-500"
                : "btn-primary"
            }
          >
            {ctaLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}
