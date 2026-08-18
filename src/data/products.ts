export interface GameInfo {
  slug: string;
  name: string;
}

export const games: GameInfo[] = [
  { slug: "pokemon", name: "Pokémon" },
  { slug: "one-piece", name: "One Piece" },
];

export const gameMap: Record<string, GameInfo> = games.reduce(
  (acc, g) => ({ ...acc, [g.slug]: g }),
  {} as Record<string, GameInfo>
);

export type Category =
  | "pokemon-jp"
  | "pokemon-en"
  | "pokemon-kr"
  | "pokemon-cn"
  | "one-piece-en"
  | "one-piece-jp";

export interface CategoryInfo {
  value: Category;
  label: string;
  gameSlug: string;
  gameName: string;
}

export const categories: CategoryInfo[] = [
  { value: "pokemon-jp", label: "Pokémon (Jap)", gameSlug: "pokemon", gameName: "Pokémon" },
  { value: "pokemon-en", label: "Pokémon (Eng)", gameSlug: "pokemon", gameName: "Pokémon" },
  { value: "pokemon-kr", label: "Pokémon (KR)", gameSlug: "pokemon", gameName: "Pokémon" },
  { value: "pokemon-cn", label: "Pokémon (CN)", gameSlug: "pokemon", gameName: "Pokémon" },
  { value: "one-piece-en", label: "One Piece (Eng)", gameSlug: "one-piece", gameName: "One Piece" },
  { value: "one-piece-jp", label: "One Piece (Jap)", gameSlug: "one-piece", gameName: "One Piece" },
];

export const categoryMap: Record<Category, CategoryInfo> = categories.reduce(
  (acc, c) => ({ ...acc, [c.value]: c }),
  {} as Record<Category, CategoryInfo>
);

export const categoryBadgeClasses: Record<Category, string> = {
  "pokemon-jp": "bg-gold-100 text-gold-600 ring-1 ring-inset ring-gold-400/40",
  "pokemon-en": "bg-gold-100 text-gold-600 ring-1 ring-inset ring-gold-400/40",
  "pokemon-kr": "bg-gold-100 text-gold-600 ring-1 ring-inset ring-gold-400/40",
  "pokemon-cn": "bg-gold-100 text-gold-600 ring-1 ring-inset ring-gold-400/40",
  "one-piece-en": "bg-ember-500/10 text-ember-600 ring-1 ring-inset ring-ember-500/30",
  "one-piece-jp": "bg-ember-500/10 text-ember-600 ring-1 ring-inset ring-ember-500/30",
};

export interface PreorderProduct {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  category: Category;
  productType: string;
  price: number;
  depositPercent: number;
  releaseDate: string;
  limitedQty?: boolean;
  quantityAvailable?: number;
}

export interface StockProduct {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  category: Category;
  productType: string;
  price: number;
  quantityAvailable: number;
}

import { preorderProducts, stockProducts } from "./products.generated";
export { preorderProducts, stockProducts };

export type AnyProduct =
  | { kind: "preorder"; product: PreorderProduct }
  | { kind: "stock"; product: StockProduct };

export function getProductById(id: string): AnyProduct | undefined {
  const preorder = preorderProducts.find((p) => p.id === id);
  if (preorder) return { kind: "preorder", product: preorder };
  const stock = stockProducts.find((p) => p.id === id);
  if (stock) return { kind: "stock", product: stock };
  return undefined;
}
