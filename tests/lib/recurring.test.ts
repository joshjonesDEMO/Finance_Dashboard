import { describe, expect, it } from "vitest";
import {
  filterBills,
  formatDueDate,
  getBillSummary,
  groupBillsByStatus,
  sortBills,
} from "@/lib/recurring";
import type { RecurringBill, RecurringBillStatus } from "@/lib/types";

const bill = (
  name: string,
  dayOfMonth: number,
  status: RecurringBillStatus,
  amount: number,
): RecurringBill => ({ name, avatar: name.toLowerCase(), dayOfMonth, status, amount });

const bills: RecurringBill[] = [
  bill("Spark Electric Solutions", 2, "paid", 100),
  bill("Serenity Spa & Wellness", 3, "paid", 30),
  bill("Elevate Education", 4, "paid", 50),
  bill("Pixel Playground", 11, "paid", 10),
  bill("Nimbus Data Storage", 21, "dueSoon", 9.99),
  bill("ByteWise", 23, "dueSoon", 49.99),
  bill("EcoFuel Energy", 29, "upcoming", 35),
  bill("Aqua Flow Utilities", 30, "upcoming", 100),
];

describe("formatDueDate", () => {
  it("applies the correct ordinal suffix", () => {
    expect(formatDueDate(1)).toBe("Monthly - 1st");
    expect(formatDueDate(2)).toBe("Monthly - 2nd");
    expect(formatDueDate(3)).toBe("Monthly - 3rd");
    expect(formatDueDate(4)).toBe("Monthly - 4th");
    expect(formatDueDate(11)).toBe("Monthly - 11th");
    expect(formatDueDate(21)).toBe("Monthly - 21st");
    expect(formatDueDate(23)).toBe("Monthly - 23rd");
  });
});

describe("getBillSummary", () => {
  const summary = getBillSummary(bills);

  it("sums every bill for the total", () => {
    expect(summary.total).toBeCloseTo(384.98, 2);
  });

  it("counts and totals paid bills", () => {
    expect(summary.paid.count).toBe(4);
    expect(summary.paid.total).toBeCloseTo(190, 2);
  });

  it("counts and totals due-soon bills", () => {
    expect(summary.dueSoon.count).toBe(2);
    expect(summary.dueSoon.total).toBeCloseTo(59.98, 2);
  });

  it("folds due-soon bills into total upcoming", () => {
    expect(summary.totalUpcoming.count).toBe(4);
    expect(summary.totalUpcoming.total).toBeCloseTo(194.98, 2);
  });
});

describe("groupBillsByStatus", () => {
  it("splits bills into their status buckets", () => {
    const groups = groupBillsByStatus(bills);
    expect(groups.paid).toHaveLength(4);
    expect(groups.upcoming).toHaveLength(2);
    expect(groups.dueSoon).toHaveLength(2);
  });
});

describe("filterBills", () => {
  it("returns all bills for an empty query", () => {
    expect(filterBills(bills, "   ")).toHaveLength(bills.length);
  });

  it("matches the bill title case-insensitively and preserves input order", () => {
    const result = filterBills(bills, "spa");
    expect(result.map((b) => b.name)).toEqual([
      "Spark Electric Solutions",
      "Serenity Spa & Wellness",
    ]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterBills(bills, "nonexistent")).toHaveLength(0);
  });
});

describe("sortBills", () => {
  const names = (list: RecurringBill[]) => list.map((b) => b.name);

  it("latest orders by day of month ascending (the desktop resting order)", () => {
    expect(names(sortBills(bills, "latest"))).toEqual([
      "Spark Electric Solutions",
      "Serenity Spa & Wellness",
      "Elevate Education",
      "Pixel Playground",
      "Nimbus Data Storage",
      "ByteWise",
      "EcoFuel Energy",
      "Aqua Flow Utilities",
    ]);
  });

  it("oldest reverses the day-of-month order", () => {
    expect(names(sortBills(bills, "oldest"))[0]).toBe("Aqua Flow Utilities");
  });

  it("sorts alphabetically both ways", () => {
    expect(names(sortBills(bills, "aToZ"))[0]).toBe("Aqua Flow Utilities");
    expect(names(sortBills(bills, "zToA"))[0]).toBe("Spark Electric Solutions");
  });

  it("sorts by amount both ways", () => {
    const highest = sortBills(bills, "highest");
    const lowest = sortBills(bills, "lowest");
    expect(highest[0].amount).toBe(100);
    expect(lowest[0].amount).toBe(9.99);
  });

  it("does not mutate the input array", () => {
    const original = [...bills];
    sortBills(bills, "highest");
    expect(bills).toEqual(original);
  });
});
