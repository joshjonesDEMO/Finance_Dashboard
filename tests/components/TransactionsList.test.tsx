import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TransactionsList } from "@/components/transactions/TransactionsList";
import type { Transaction } from "@/lib/types";

const transactions: Transaction[] = [
  {
    avatar: "emma",
    name: "Emma Richardson",
    category: "General",
    date: "2024-08-19",
    amount: 75.5,
    recurring: false,
  },
  {
    avatar: "savory",
    name: "Savory Bites Bistro",
    category: "Dining Out",
    date: "2024-08-18",
    amount: -55.5,
    recurring: false,
  },
  {
    avatar: "unknown",
    name: "Zero Balance",
    category: "Bills",
    date: "2024-08-17",
    amount: 0,
    recurring: false,
  },
];

describe("TransactionsList", () => {
  it("renders a labeled list containing every transaction", () => {
    render(<TransactionsList transactions={transactions} />);

    const list = screen.getByRole("list", { name: "All transactions" });
    expect(list.children).toHaveLength(3);
  });

  it("renders recipient names and categories", () => {
    render(<TransactionsList transactions={transactions} />);

    expect(screen.getByText("Emma Richardson")).toBeInTheDocument();
    expect(screen.getByText("Savory Bites Bistro")).toBeInTheDocument();
    expect(screen.getByText("Zero Balance")).toBeInTheDocument();
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Dining Out")).toBeInTheDocument();
    expect(screen.getByText("Bills")).toBeInTheDocument();
  });

  it("formats signed currency and applies the correct amount colors", () => {
    render(<TransactionsList transactions={transactions} />);

    expect(screen.getByText("+$75.50")).toHaveClass(
      "text-preset-4-bold",
      "text-secondary-green",
    );
    expect(screen.getByText("+$0.00")).toHaveClass(
      "text-preset-4-bold",
      "text-secondary-green",
    );
    expect(screen.getByText("-$55.50")).toHaveClass(
      "text-preset-4-bold",
      "text-grey-900",
    );
  });

  it("uses the Overview date format and semantic time values", () => {
    render(<TransactionsList transactions={transactions} />);

    expect(screen.getByText("Aug 19, 2024")).toHaveAttribute(
      "datetime",
      "2024-08-19",
    );
    expect(screen.getByText("Aug 18, 2024")).toHaveAttribute(
      "datetime",
      "2024-08-18",
    );
    expect(screen.getByText("Aug 17, 2024")).toHaveAttribute(
      "datetime",
      "2024-08-17",
    );
  });

  it("renders an empty labeled list when there are no transactions", () => {
    render(<TransactionsList transactions={[]} />);

    const list = screen.getByRole("list", { name: "All transactions" });
    expect(list.children).toHaveLength(0);
  });
});
