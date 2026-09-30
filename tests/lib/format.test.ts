import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatSignedAmount,
  formatTransactionDate,
} from "@/lib/format";

describe("formatCurrency", () => {
  it("formats positive amounts with no leading sign by default", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  it("prefixes negative amounts with a minus sign", () => {
    expect(formatCurrency(-50)).toBe("-$50.00");
  });

  it("does not add a sign for zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it('respects sign="always" for negatives but does not add + for positives', () => {
    expect(formatCurrency(-12, "always")).toBe("-$12.00");
    expect(formatCurrency(12, "always")).toBe("$12.00");
  });

  it("always shows two fraction digits", () => {
    expect(formatCurrency(7)).toBe("$7.00");
    expect(formatCurrency(7.1)).toBe("$7.10");
  });
});

describe("formatTransactionDate", () => {
  it("formats an ISO date as day, short month, year", () => {
    expect(formatTransactionDate("2024-08-19")).toBe("19 Aug 2024");
  });

  it("does not drift across time zones at month boundaries", () => {
    expect(formatTransactionDate("2024-09-01")).toBe("1 Sep 2024");
    expect(formatTransactionDate("2022-12-31")).toBe("31 Dec 2022");
  });
});

describe("formatSignedAmount", () => {
  it("prefixes positives with + and keeps thousands separators", () => {
    expect(formatSignedAmount(1200)).toBe("+$1,200.00");
  });

  it("prefixes negatives with -", () => {
    expect(formatSignedAmount(-55.5)).toBe("-$55.50");
  });

  it("treats zero as positive", () => {
    expect(formatSignedAmount(0)).toBe("+$0.00");
  });
});
