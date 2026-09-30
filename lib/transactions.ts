import type { Transaction } from "./types";

export const PAGE_SIZE = 10;

export const SORT_OPTIONS = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export const ALL_CATEGORIES = "All Transactions";

const compareNames = (a: Transaction, b: Transaction) =>
  a.name.localeCompare(b.name, "en", { sensitivity: "base" });
const compareDates = (a: Transaction, b: Transaction) =>
  new Date(a.date).getTime() - new Date(b.date).getTime();
const compareAmounts = (a: Transaction, b: Transaction) => a.amount - b.amount;

// Descending comparators swap arguments instead of reversing an ascending
// result, so the stable sort keeps tied rows in data order in both directions.
const comparators: Record<SortOption, (a: Transaction, b: Transaction) => number> = {
  Latest: (a, b) => compareDates(b, a),
  Oldest: compareDates,
  "A to Z": compareNames,
  "Z to A": (a, b) => compareNames(b, a),
  Highest: (a, b) => compareAmounts(b, a),
  Lowest: compareAmounts,
};

export function sortTransactions(transactions: Transaction[], sort: SortOption): Transaction[] {
  return [...transactions].sort(comparators[sort]);
}

export function getCategories(transactions: Transaction[]): string[] {
  return [...new Set(transactions.map((t) => t.category))].sort((a, b) => a.localeCompare(b));
}

export function filterTransactions(
  transactions: Transaction[],
  query: string,
  category: string,
): Transaction[] {
  const needle = query.trim().toLowerCase();
  return transactions.filter(
    (t) =>
      (category === ALL_CATEGORIES || t.category === category) &&
      t.name.toLowerCase().includes(needle),
  );
}

export function paginate<T>(
  items: T[],
  page: number,
  pageSize = PAGE_SIZE,
): { items: T[]; page: number; pageCount: number } {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page: current, pageCount };
}
