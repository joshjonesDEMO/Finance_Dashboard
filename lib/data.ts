import type { FinanceData, Transaction } from "./types";
import finance from "@/data/finance.json";

export function getFinanceData(): FinanceData {
  return finance as FinanceData;
}

/** Latest transactions first (by ISO date string) */
export function getTransactionsNewestFirst(data: FinanceData): Transaction[] {
  return [...data.transactions].sort((a, b) => b.date.localeCompare(a.date));
}

export function getLatestTransactions(
  data: FinanceData,
  limit = 5,
): Transaction[] {
  return getTransactionsNewestFirst(data).slice(0, limit);
}

export function sumAmounts(transactions: { amount: number }[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
