export interface StockStatus {
  label: string;
  badgeClass: string;
  soldOut: boolean;
}

const LOW_STOCK_THRESHOLD = 5;

export function getStockStatus(quantityAvailable: number, noun: string = "in stock"): StockStatus {
  if (quantityAvailable <= 0) {
    return {
      label: "Sold Out",
      badgeClass: "bg-slate-200 text-slate-500 ring-1 ring-inset ring-slate-300",
      soldOut: true,
    };
  }
  if (quantityAvailable < LOW_STOCK_THRESHOLD) {
    return {
      label: `Only ${quantityAvailable} left`,
      badgeClass: "bg-ember-500/10 text-ember-600 ring-1 ring-inset ring-ember-500/30",
      soldOut: false,
    };
  }
  return {
    label: `${quantityAvailable} ${noun}`,
    badgeClass: "bg-leaf-100 text-leaf-600 ring-1 ring-inset ring-leaf-400/40",
    soldOut: false,
  };
}

export function isSoldOut(quantityAvailable: number | undefined): boolean {
  return quantityAvailable !== undefined && quantityAvailable <= 0;
}

// Available items first (newest-added first within that group), sold-out items pushed to the
// back. "Newest" is inferred from list order — later sheet rows sort earlier.
export function sortByAvailability<T>(items: T[], getQty: (item: T) => number | undefined): T[] {
  return items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const aSoldOut = isSoldOut(getQty(a.item));
      const bSoldOut = isSoldOut(getQty(b.item));
      if (aSoldOut !== bSoldOut) return aSoldOut ? 1 : -1;
      return b.index - a.index;
    })
    .map(({ item }) => item);
}
