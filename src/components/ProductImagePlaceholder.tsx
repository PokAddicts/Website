import { Category, categoryMap } from "../data/products";

const gradients: Record<string, string> = {
  Pokémon: "from-gold-100 via-white to-leaf-50",
  "One Piece": "from-ember-500/10 via-white to-gold-50",
};
const fallbackGradient = "from-slate-100 via-white to-slate-50";

interface ProductImagePlaceholderProps {
  category: Category;
  imageUrl?: string;
}

export default function ProductImagePlaceholder({ category, imageUrl }: ProductImagePlaceholderProps) {
  const info = categoryMap[category];

  if (imageUrl) {
    return (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl border-b border-slate-200 bg-slate-50">
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`flex aspect-[4/3] w-full items-center justify-center rounded-t-xl border-b border-slate-200 bg-gradient-to-br ${
        gradients[info.gameName] ?? fallbackGradient
      }`}
    >
      <span className="font-display text-sm font-semibold uppercase tracking-widest text-slate-400">
        {info.gameName}
      </span>
    </div>
  );
}
