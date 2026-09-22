import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BillsPanel } from "@/components/recurring/BillsPanel";
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
  bill("Nimbus Data Storage", 21, "dueSoon", 9.99),
  bill("Aqua Flow Utilities", 30, "upcoming", 100),
];

function rowNames() {
  return screen
    .getAllByRole("listitem")
    .map((item) => item.querySelector("p")?.textContent ?? "");
}

describe("BillsPanel", () => {
  it("renders every bill in the resting Latest order", () => {
    render(<BillsPanel bills={bills} />);
    expect(rowNames()).toEqual([
      "Spark Electric Solutions",
      "Serenity Spa & Wellness",
      "Nimbus Data Storage",
      "Aqua Flow Utilities",
    ]);
  });

  it("shows the formatted due date and amount for a bill", () => {
    render(<BillsPanel bills={bills} />);
    expect(screen.getByText("Monthly - 2nd")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
  });

  it("filters bills by title as the user types", () => {
    render(<BillsPanel bills={bills} />);
    fireEvent.change(screen.getByLabelText("Search bills"), {
      target: { value: "aqua" },
    });
    expect(screen.getByText("Aqua Flow Utilities")).toBeInTheDocument();
    expect(
      screen.queryByText("Spark Electric Solutions"),
    ).not.toBeInTheDocument();
  });

  it("shows an empty state when no bill matches the search", () => {
    render(<BillsPanel bills={bills} />);
    fireEvent.change(screen.getByLabelText("Search bills"), {
      target: { value: "zzz" },
    });
    expect(screen.getByText("No bills found.")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("reorders bills when a sort option is chosen", () => {
    render(<BillsPanel bills={bills} />);
    fireEvent.click(screen.getByRole("button", { name: "Sort by" }));
    fireEvent.click(screen.getByRole("option", { name: "Highest" }));
    expect(rowNames()[0]).toBe("Spark Electric Solutions");

    fireEvent.click(screen.getByRole("button", { name: "Sort by" }));
    fireEvent.click(screen.getByRole("option", { name: "Lowest" }));
    expect(rowNames()[0]).toBe("Nimbus Data Storage");
  });
});
