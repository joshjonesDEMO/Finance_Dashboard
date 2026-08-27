import type { FinanceData, Transaction } from "./types";
import finance from "@/data/finance.json";

export function getFinanceData(): FinanceData {
  return finance as FinanceData;
}

export function getAllTransactions(data: FinanceData): Transaction[] {
  return [...data.transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Latest transactions first (by ISO date string) */
export function getLatestTransactions(
  data: FinanceData,
  limit = 5,
): Transaction[] {
  return getAllTransactions(data).slice(0, limit);
}

export function sumAmounts(transactions: { amount: number }[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
