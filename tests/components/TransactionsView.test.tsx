import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import type { Transaction } from "@/lib/types";

const tx = (
  name: string,
  date: string,
  amount: number,
  category = "General",
): Transaction => ({ avatar: "x", name, category, date, amount, recurring: false });

const small: Transaction[] = [
  tx("Emma Richardson", "2024-08-19", 75.5, "General"),
  tx("Savory Bites Bistro", "2024-08-19", -55.5, "Dining Out"),
  tx("Daniel Carter", "2024-08-18", -42.3, "General"),
  tx("Urban Ledger", "2024-08-11", 1200, "Bills"),
  tx("Emma Richardson", "2024-08-10", -10, "Bills"),
];

// 23 rows named "Row 01".."Row 23", Row 01 newest.
const many: Transaction[] = Array.from({ length: 23 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return tx(`Row ${n}`, `2024-07-${String(31 - i).padStart(2, "0")}`, -(i + 1), i % 2 ? "Bills" : "General");
});

const rowNames = () =>
  screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0].querySelector("p")?.textContent);

const search = () => screen.getByRole("searchbox", { name: "Search transaction" });
const sortSelect = () => screen.getByRole("combobox", { name: "Sort by" });
const categorySelect = () => screen.getByRole("combobox", { name: "Category" });
const currentPage = () =>
  within(screen.getByRole("navigation", { name: "Pagination" }))
    .getAllByRole("button")
    .find((b) => b.getAttribute("aria-current") === "page")?.textContent;

describe("TransactionsView", () => {
  it("renders a table with the Figma columns, newest first", () => {
    render(<TransactionsView transactions={small} />);
    expect(
      screen.getAllByRole("columnheader").map((h) => h.textContent),
    ).toEqual(["Recipient / Sender", "Category", "Transaction Date", "Amount"]);
    expect(rowNames()).toEqual([
      "Emma Richardson",
      "Savory Bites Bistro",
      "Daniel Carter",
      "Urban Ledger",
      "Emma Richardson",
    ]);
  });

  it("formats dates and signed amounts, colouring income green", () => {
    render(<TransactionsView transactions={small} />);
    const bistro = screen.getAllByRole("row")[2];
    expect(within(bistro).getAllByText("19 Aug 2024").length).toBeGreaterThan(0);
    expect(within(bistro).getByText("-$55.50")).toHaveClass("text-grey-900");
    expect(screen.getByText("+$1,200.00")).toHaveClass("text-secondary-green");
  });

  it("offers All Transactions then the data's categories alphabetically", () => {
    render(<TransactionsView transactions={small} />);
    expect(
      within(categorySelect()).getAllByRole("option").map((o) => o.textContent),
    ).toEqual(["All Transactions", "Bills", "Dining Out", "General"]);
  });

  it("filters by category and restores all rows", () => {
    render(<TransactionsView transactions={small} />);
    fireEvent.change(categorySelect(), { target: { value: "Bills" } });
    expect(rowNames()).toEqual(["Urban Ledger", "Emma Richardson"]);
    fireEvent.change(categorySelect(), { target: { value: "All Transactions" } });
    expect(rowNames()).toHaveLength(5);
  });

  it("searches by name ignoring case and whitespace, and clearing restores rows", () => {
    render(<TransactionsView transactions={small} />);
    fireEvent.change(search(), { target: { value: "  EMMA " } });
    expect(rowNames()).toEqual(["Emma Richardson", "Emma Richardson"]);
    fireEvent.change(search(), { target: { value: "" } });
    expect(rowNames()).toHaveLength(5);
  });

  it("combines search, category, and sort", () => {
    render(<TransactionsView transactions={small} />);
    fireEvent.change(search(), { target: { value: "e" } });
    fireEvent.change(categorySelect(), { target: { value: "General" } });
    fireEvent.change(sortSelect(), { target: { value: "A to Z" } });
    expect(rowNames()).toEqual(["Daniel Carter", "Emma Richardson"]);
  });

  it("offers the six sort options with Latest selected", () => {
    render(<TransactionsView transactions={small} />);
    expect(sortSelect()).toHaveValue("Latest");
    expect(
      within(sortSelect()).getAllByRole("option").map((o) => o.textContent),
    ).toEqual(["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"]);
    fireEvent.change(sortSelect(), { target: { value: "Highest" } });
    expect(rowNames()[0]).toBe("Urban Ledger");
  });

  it("shows 10 rows per page and pages through the rest", () => {
    render(<TransactionsView transactions={many} />);
    expect(rowNames()).toHaveLength(10);
    expect(rowNames()[0]).toBe("Row 01");
    expect(currentPage()).toBe("1");
    expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(rowNames()).toEqual(["Row 21", "Row 22", "Row 23"]);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it.each([
    ["search", () => fireEvent.change(search(), { target: { value: "Row" } })],
    ["sort", () => fireEvent.change(sortSelect(), { target: { value: "Oldest" } })],
    ["category", () => fireEvent.change(categorySelect(), { target: { value: "General" } })],
  ])("returns to page 1 when %s changes", (_, change) => {
    render(<TransactionsView transactions={many} />);
    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(currentPage()).toBe("3");
    change();
    expect(currentPage()).toBe("1");
  });

  it("shows an empty state and hides pagination when nothing matches", () => {
    render(<TransactionsView transactions={small} />);
    fireEvent.change(search(), { target: { value: "zzz" } });
    expect(screen.getByText("No transactions found.")).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Pagination" })).not.toBeInTheDocument();
  });

  it("announces the result count through a persistent status region", () => {
    render(<TransactionsView transactions={small} />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("5 transactions found");
    fireEvent.change(search(), { target: { value: "emma" } });
    expect(screen.getByRole("status")).toBe(status);
    expect(status).toHaveTextContent("2 transactions found");
    fireEvent.change(search(), { target: { value: "zzz" } });
    expect(status).toHaveTextContent("0 transactions found");
  });

  it("shows a single disabled-arrow page for 10 or fewer rows", () => {
    render(<TransactionsView transactions={small} />);
    expect(currentPage()).toBe("1");
    expect(screen.getByRole("button", { name: "Prev" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });
});
