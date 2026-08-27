import { describe, expect, it } from "vitest";
import {
  getFinanceData,
  getLatestTransactions,
  getTransactionsNewestFirst,
  sumAmounts,
} from "@/lib/data";
import type { FinanceData, Transaction } from "@/lib/types";

const tx = (date: string, amount = 0, name = date): Transaction => ({
  avatar: "x",
  name,
  category: "test",
  date,
  amount,
  recurring: false,
});

describe("sumAmounts", () => {
  it("sums an empty list to 0", () => {
    expect(sumAmounts([])).toBe(0);
  });

  it("sums positive and negative amounts", () => {
    expect(sumAmounts([{ amount: 10 }, { amount: -3 }, { amount: 2.5 }])).toBe(9.5);
  });
});

describe("getTransactionsNewestFirst", () => {
  const data = {
    transactions: [
      tx("2024-01-01", 1, "oldest"),
      tx("2024-03-15", 2, "newest"),
      tx("2024-02-10", 3, "middle"),
    ],
  } as unknown as FinanceData;

  it("returns every transaction newest first", () => {
    expect(getTransactionsNewestFirst(data).map(({ name }) => name)).toEqual([
      "newest",
      "middle",
      "oldest",
    ]);
  });

  it("returns all ten fixture transactions in newest-first order", () => {
    const result = getTransactionsNewestFirst(getFinanceData());

    expect(result).toHaveLength(10);
    expect(result.map(({ name }) => name)).toEqual([
      "Emma Richardson",
      "Urban Services Hub",
      "Emma Richardson",
      "Savory Eats",
      "Floral Boutique",
      "Spark Electric",
      "Urban Ledger",
      "Trail Hiking Gear",
      "Northwind Traders",
      "Ember Coffee Co.",
    ]);
  });

  it("does not mutate the input array", () => {
    const original = [...data.transactions];

    getTransactionsNewestFirst(data);

    expect(data.transactions).toEqual(original);
  });

  it("preserves source order when transaction dates are equal", () => {
    const equalDates = {
      transactions: [
        tx("2024-03-15", 1, "first on date"),
        tx("2024-04-01", 2, "newer"),
        tx("2024-03-15", 3, "second on date"),
      ],
    } as unknown as FinanceData;

    expect(
      getTransactionsNewestFirst(equalDates).map(({ name }) => name),
    ).toEqual(["newer", "first on date", "second on date"]);
  });
});

describe("getLatestTransactions", () => {
  const data = {
    transactions: [
      tx("2024-01-01", 1, "a"),
      tx("2024-03-15", 2, "b"),
      tx("2024-02-10", 3, "c"),
      tx("2024-05-20", 4, "d"),
    ],
  } as unknown as FinanceData;

  it("returns transactions sorted by date descending", () => {
    const result = getLatestTransactions(data, 10).map((t) => t.name);
    expect(result).toEqual(["d", "b", "c", "a"]);
  });

  it("respects the limit parameter", () => {
    expect(getLatestTransactions(data, 2)).toHaveLength(2);
  });

  it("defaults to a limit of 5", () => {
    const big = {
      transactions: Array.from({ length: 8 }, (_, i) =>
        tx(`2024-01-0${i + 1}`, i),
      ),
    } as unknown as FinanceData;
    expect(getLatestTransactions(big)).toHaveLength(5);
  });

  it("does not mutate the input array", () => {
    const original = [...data.transactions];
    getLatestTransactions(data, 2);
    expect(data.transactions).toEqual(original);
  });
});
