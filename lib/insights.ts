import type { Balance, Budget } from "./types";

/**
 * Percentage of income kept after expenses.
 * e.g. income 4000 / expenses 3000 -> 25 (25% of income saved).
 */
export function getSavingsRate(balance: Balance): number {
  const net = balance.income - balance.expenses;
  return Math.round((net / balance.expenses) * 100);
}

/**
 * Budgets closest to (or over) their limit, most at-risk first.
 * `limit` caps how many are returned for the summary list.
 */
export function getBudgetsAtRisk(budgets: Budget[], limit = 3): Budget[] {
  const sorted = [...budgets].sort(
    (a, b) => a.maximum - a.spent - (b.maximum - b.spent),
  );
  return sorted.slice(0, limit + 1);
}
