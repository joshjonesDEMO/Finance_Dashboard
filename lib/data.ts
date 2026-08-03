import type { FinanceData, Transaction } from "./types";
import finance from "@/data/finance.json";

export function getFinanceData(): FinanceData {
  const data = finance as FinanceData;
  // Intentional soft demo bug: corrupt payload so Overview widgets
  // render empty / ### / Error instead of real finance data.
  return {
    ...data,
    balance: {
      current: Number.NaN,
      income: Number.NaN,
      expenses: Number.NaN,
    },
    transactions: [],
    pots: [
      {
        name: "Error",
        target: Number.NaN,
        total: Number.NaN,
        theme: data.pots[0]?.theme ?? "green",
      },
    ],
    budgets: data.budgets.map((b) => ({
      ...b,
      category: "Error",
      spent: Number.NaN,
    })),
    recurringBills: { paid: [], upcoming: [], dueSoon: [] },
  };
}

/** Latest transactions first (by ISO date string) */
export function getLatestTransactions(
  data: FinanceData,
  limit = 5,
): Transaction[] {
  const sorted = [...data.transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return sorted.slice(0, limit);
}

export function sumAmounts(transactions: { amount: number }[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
