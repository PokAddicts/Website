import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProductListCard from "../components/ProductListCard";
import {
  categoryBadgeClasses,
  categoryMap,
  preorderProducts,
  stockProducts,
} from "../data/products";

interface SearchResult {
  id: string;
  kind: "preorder" | "stock";
  name: string;
  productType: string;
  category: (typeof preorderProducts)[number]["category"];
  price: number;
  imageUrl?: string;
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const inputRef = useRef<HTMLInputElement>(null);

  const allProducts: SearchResult[] = useMemo(
    () => [
      ...preorderProducts.map((p) => ({
        id: p.id,
        kind: "preorder" as const,
        name: p.name,
        productType: p.productType,
        category: p.category,
        price: p.price,
        imageUrl: p.imageUrl,
      })),
      ...stockProducts.map((p) => ({
        id: p.id,
        kind: "stock" as const,
        name: p.name,
        productType: p.productType,
        category: p.category,
        price: p.price,
        imageUrl: p.imageUrl,
      })),
    ],
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.productType.toLowerCase().includes(q) ||
        categoryMap[p.category].label.toLowerCase().includes(q) ||
        categoryMap[p.category].gameName.toLowerCase().includes(q)
    );
  }, [allProducts, query]);

  return (
    <div>
      <PageHeader eyebrow="Find Something" title="Search Products" />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            autoFocus
            className="field-input pl-10"
            placeholder="Search by name, set, or category..."
            value={query}
            onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
          />
        </div>

        {!query.trim() && (
          <p className="py-16 text-center text-slate-400">
            Start typing to search across preorders and current stock.
          </p>
        )}

        {query.trim() && results.length === 0 && (
          <p className="py-16 text-center text-slate-400">
            No products found for "{query}".
          </p>
        )}

        {results.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product) => (
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
                statusBadge={{
                  label: product.kind === "preorder" ? "Preorder" : "In Stock",
                  className: "bg-slate-100 text-slate-500",
                }}
                ctaLabel="View Details"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
