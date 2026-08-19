import { Category, categoryMap } from "../data/products";

const gradients: Record<string, string> = {
  Pokémon: "from-gold-100 via-white to-leaf-50",
  "One Piece": "from-ember-500/10 via-white to-gold-50",
};
const fallbackGradient = "from-slate-100 via-white to-slate-50";

const DEFAULT_CLASS = "aspect-[4/3] w-full rounded-t-xl border-b border-slate-200";

interface ProductImagePlaceholderProps {
  category: Category;
  imageUrl?: string;
  className?: string;
}

export default function ProductImagePlaceholder({
  category,
  imageUrl,
  className = DEFAULT_CLASS,
}: ProductImagePlaceholderProps) {
  const info = categoryMap[category];

  if (imageUrl) {
    return (
      <div className={`overflow-hidden bg-slate-50 ${className}`}>
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${
        gradients[info.gameName] ?? fallbackGradient
      } ${className}`}
    >
      <span className="font-display text-xs font-semibold uppercase tracking-widest text-slate-400 sm:text-sm">
        {info.gameName}
      </span>
    </div>
  );
}
