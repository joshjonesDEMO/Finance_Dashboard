import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { TransactionsList } from "@/components/transactions/TransactionsList";
import type { Transaction } from "@/lib/types";

const transactions: Transaction[] = [
  {
    avatar: "ledger",
    name: "Urban Ledger",
    category: "General",
    date: "2024-08-20",
    amount: 1200,
    recurring: false,
  },
  {
    avatar: "emma",
    name: "Emma Richardson",
    category: "General",
    date: "2024-08-19",
    amount: -100.25,
    recurring: true,
  },
  {
    avatar: "savory",
    name: "Savory Eats",
    category: "Dining Out",
    date: "2024-08-18",
    amount: -17.5,
    recurring: false,
  },
];

describe("TransactionsList", () => {
  it("renders a labeled list of all transactions", () => {
    render(<TransactionsList transactions={transactions} />);
    const list = screen.getByRole("list", { name: "All transactions" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders each transaction's name, category, and formatted date", () => {
    render(<TransactionsList transactions={transactions} />);
    expect(screen.getByText("Urban Ledger")).toBeInTheDocument();
    expect(screen.getByText("Emma Richardson")).toBeInTheDocument();
    expect(screen.getByText("Savory Eats")).toBeInTheDocument();
    expect(screen.getAllByText("General")).toHaveLength(2);
    expect(screen.getByText("Dining Out")).toBeInTheDocument();
    expect(screen.getByText("Aug 20, 2024")).toBeInTheDocument();
    expect(screen.getByText("Aug 19, 2024")).toBeInTheDocument();
    expect(screen.getByText("Aug 18, 2024")).toBeInTheDocument();
  });

  it("formats positive amounts with a + and negatives with a -", () => {
    render(<TransactionsList transactions={transactions} />);
    expect(screen.getByText("+$1,200.00")).toBeInTheDocument();
    expect(screen.getByText("-$100.25")).toBeInTheDocument();
    expect(screen.getByText("-$17.50")).toBeInTheDocument();
  });

  it("renders rows in the order given", () => {
    render(<TransactionsList transactions={transactions} />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Urban Ledger");
    expect(items[1]).toHaveTextContent("Emma Richardson");
    expect(items[2]).toHaveTextContent("Savory Eats");
  });

  it("renders nothing in the list when given no transactions", () => {
    render(<TransactionsList transactions={[]} />);
    const list = screen.getByRole("list", { name: "All transactions" });
    expect(list.children).toHaveLength(0);
  });
});
