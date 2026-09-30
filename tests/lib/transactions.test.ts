import { describe, expect, it } from "vitest";
import {
  ALL_CATEGORIES,
  SORT_OPTIONS,
  filterTransactions,
  getCategories,
  paginate,
  sortTransactions,
} from "@/lib/transactions";
import type { Transaction } from "@/lib/types";

const tx = (
  name: string,
  date: string,
  amount: number,
  category = "General",
): Transaction => ({ avatar: "x", name, category, date, amount, recurring: false });

// Two rows share a name and two share a date so tie order is observable.
const fixture: Transaction[] = [
  tx("Emma Richardson", "2024-08-19", 75.5, "General"),
  tx("savory Bites", "2024-08-17", -55.5, "Dining Out"),
  tx("Daniel Carter", "2024-08-19", -42.3, "General"),
  tx("Emma Richardson", "2024-08-11", -6.5, "Bills"),
  tx("Urban Ledger", "2024-08-01", 1200, "Bills"),
  tx("Spark Electric", "2024-07-30", -250, "Bills"),
];

const names = (list: Transaction[]) => list.map((t) => `${t.name}|${t.date}`);

describe("sortTransactions", () => {
  it("offers the six Figma sort options, Latest first", () => {
    expect(SORT_OPTIONS).toEqual(["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"]);
  });

  it("Latest orders by date descending and keeps same-date rows in input order", () => {
    expect(names(sortTransactions(fixture, "Latest"))).toEqual([
      "Emma Richardson|2024-08-19",
      "Daniel Carter|2024-08-19",
      "savory Bites|2024-08-17",
      "Emma Richardson|2024-08-11",
      "Urban Ledger|2024-08-01",
      "Spark Electric|2024-07-30",
    ]);
  });

  it("Oldest orders by date ascending and keeps same-date rows in input order", () => {
    expect(names(sortTransactions(fixture, "Oldest")).slice(-2)).toEqual([
      "Emma Richardson|2024-08-19",
      "Daniel Carter|2024-08-19",
    ]);
  });

  it("A to Z compares names case-insensitively and keeps duplicate names in input order", () => {
    expect(names(sortTransactions(fixture, "A to Z"))).toEqual([
      "Daniel Carter|2024-08-19",
      "Emma Richardson|2024-08-19",
      "Emma Richardson|2024-08-11",
      "savory Bites|2024-08-17",
      "Spark Electric|2024-07-30",
      "Urban Ledger|2024-08-01",
    ]);
  });

  it("Z to A is not a reversed A to Z: duplicate names still keep input order", () => {
    expect(names(sortTransactions(fixture, "Z to A"))).toEqual([
      "Urban Ledger|2024-08-01",
      "Spark Electric|2024-07-30",
      "savory Bites|2024-08-17",
      "Emma Richardson|2024-08-19",
      "Emma Richardson|2024-08-11",
      "Daniel Carter|2024-08-19",
    ]);
  });

  it("Highest and Lowest sort by signed amount", () => {
    const amounts = [tx("a", "2024-01-01", -6.5), tx("b", "2024-01-01", 1200), tx("c", "2024-01-01", -250)];
    expect(sortTransactions(amounts, "Highest").map((t) => t.amount)).toEqual([1200, -6.5, -250]);
    expect(sortTransactions(amounts, "Lowest").map((t) => t.amount)).toEqual([-250, -6.5, 1200]);
  });

  it("keeps equal amounts in input order in both directions", () => {
    const ties = [tx("first", "2024-01-01", 10), tx("second", "2024-01-02", 10)];
    expect(sortTransactions(ties, "Highest").map((t) => t.name)).toEqual(["first", "second"]);
    expect(sortTransactions(ties, "Lowest").map((t) => t.name)).toEqual(["first", "second"]);
  });

  it("does not mutate its input", () => {
    const copy = [...fixture];
    sortTransactions(fixture, "A to Z");
    expect(fixture).toEqual(copy);
  });
});

describe("getCategories", () => {
  it("returns distinct categories sorted alphabetically", () => {
    expect(getCategories([tx("a", "2024-01-01", 1, "Groceries"), tx("b", "2024-01-01", 1, "Bills"), tx("c", "2024-01-01", 1, "Bills")])).toEqual([
      "Bills",
      "Groceries",
    ]);
  });

  it("returns an empty list for no transactions", () => {
    expect(getCategories([])).toEqual([]);
  });
});

describe("filterTransactions", () => {
  it("matches names case-insensitively, ignoring surrounding whitespace", () => {
    expect(filterTransactions(fixture, "  EMMA ", ALL_CATEGORIES).map((t) => t.date)).toEqual([
      "2024-08-19",
      "2024-08-11",
    ]);
  });

  it("does not search the category", () => {
    expect(filterTransactions(fixture, "bills", ALL_CATEGORIES)).toEqual([]);
  });

  it("returns everything for a blank query and All Transactions", () => {
    expect(filterTransactions(fixture, "   ", ALL_CATEGORIES)).toEqual(fixture);
  });

  it("filters by exact category", () => {
    expect(filterTransactions(fixture, "", "Bills").map((t) => t.name)).toEqual([
      "Emma Richardson",
      "Urban Ledger",
      "Spark Electric",
    ]);
  });

  it("combines search and category", () => {
    expect(filterTransactions(fixture, "emma", "Bills").map((t) => t.date)).toEqual(["2024-08-11"]);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 23 }, (_, i) => i);

  it("returns the first page of 10 and the page count", () => {
    expect(paginate(items, 1)).toEqual({ items: items.slice(0, 10), page: 1, pageCount: 3 });
  });

  it("returns a short last page", () => {
    expect(paginate(items, 3)).toEqual({ items: [20, 21, 22], page: 3, pageCount: 3 });
  });

  it("clamps out-of-range pages", () => {
    expect(paginate(items, 9).page).toBe(3);
    expect(paginate(items, 0).page).toBe(1);
  });

  it("reports one page for empty and exactly-full inputs", () => {
    expect(paginate([], 1)).toEqual({ items: [], page: 1, pageCount: 1 });
    expect(paginate(items.slice(0, 10), 1).pageCount).toBe(1);
  });
});
