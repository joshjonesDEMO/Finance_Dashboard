import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecurringBillsCard } from "@/components/overview/RecurringBillsCard";
import type { FinanceData, RecurringBill, RecurringBillStatus } from "@/lib/types";

const bill = (
  name: string,
  amount: number,
  status: RecurringBillStatus,
): RecurringBill => ({
  name,
  avatar: "x",
  dayOfMonth: 1,
  status,
  amount,
});

const data: FinanceData = {
  balance: { current: 0, income: 0, expenses: 0 },
  pots: [],
  transactions: [],
  budgets: [],
  recurringBills: [
    bill("Netflix", 15, "paid"),
    bill("Spotify", 10, "paid"),
    bill("Rent", 1200, "upcoming"),
    bill("Power", 80, "dueSoon"),
    bill("Water", 45, "dueSoon"),
    bill("Gas", 60, "dueSoon"),
  ],
};

describe("RecurringBillsCard", () => {
  it("renders the section heading", () => {
    render(<RecurringBillsCard data={data} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Recurring Bills" }),
    ).toBeInTheDocument();
  });

  it("computes the paid total as a negative dollar amount", () => {
    render(<RecurringBillsCard data={data} />);
    expect(screen.getByText("-$25.00")).toBeInTheDocument();
  });

  it("computes the upcoming total as a negative dollar amount", () => {
    render(<RecurringBillsCard data={data} />);
    expect(screen.getByText("-$1,200.00")).toBeInTheDocument();
  });

  it("renders bill counts for each section", () => {
    render(<RecurringBillsCard data={data} />);
    expect(screen.getByText("2 bills")).toBeInTheDocument();
    expect(screen.getByText("1 bills")).toBeInTheDocument();
    expect(screen.getByText("3 bills")).toBeInTheDocument();
  });
});
