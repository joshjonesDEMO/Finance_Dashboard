import type { RecurringBill } from "./types";

export type SortOption =
  | "latest"
  | "oldest"
  | "aToZ"
  | "zToA"
  | "highest"
  | "lowest";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "aToZ", label: "A to Z" },
  { value: "zToA", label: "Z to A" },
  { value: "highest", label: "Highest" },
  { value: "lowest", label: "Lowest" },
];

export function billAvatarSrc(bill: RecurringBill): string {
  return `/bills/avatars/${bill.avatar}.png`;
}

function ordinalSuffix(day: number): string {
  const mod100 = day % 100;
  if (mod100 >= 11 && mod100 <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/** Renders a bill's recurrence as the Figma label, e.g. "Monthly - 2nd". */
export function formatDueDate(dayOfMonth: number): string {
  return `Monthly - ${dayOfMonth}${ordinalSuffix(dayOfMonth)}`;
}

/** Case-insensitive filter on the bill title only. */
export function filterBills(
  bills: RecurringBill[],
  query: string,
): RecurringBill[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return bills;
  }
  return bills.filter((bill) => bill.name.toLowerCase().includes(normalized));
}

export function sortBills(
  bills: RecurringBill[],
  option: SortOption,
): RecurringBill[] {
  const sorted = [...bills];
  switch (option) {
    case "latest":
      return sorted.sort((a, b) => a.dayOfMonth - b.dayOfMonth);
    case "oldest":
      return sorted.sort((a, b) => b.dayOfMonth - a.dayOfMonth);
    case "aToZ":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "zToA":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "highest":
      return sorted.sort((a, b) => b.amount - a.amount);
    case "lowest":
      return sorted.sort((a, b) => a.amount - b.amount);
  }
}

export function groupBillsByStatus(bills: RecurringBill[]) {
  return {
    paid: bills.filter((bill) => bill.status === "paid"),
    upcoming: bills.filter((bill) => bill.status === "upcoming"),
    dueSoon: bills.filter((bill) => bill.status === "dueSoon"),
  };
}

function totalOf(bills: RecurringBill[]): number {
  return bills.reduce((sum, bill) => sum + bill.amount, 0);
}

export type BillSummary = {
  total: number;
  paid: { count: number; total: number };
  totalUpcoming: { count: number; total: number };
  dueSoon: { count: number; total: number };
};

/**
 * Summary shown on the Recurring Bills page. "Total Upcoming" intentionally
 * includes due-soon bills (they are upcoming bills that are close to due),
 * matching the Figma design's summary panel.
 */
export function getBillSummary(bills: RecurringBill[]): BillSummary {
  const { paid, upcoming, dueSoon } = groupBillsByStatus(bills);
  return {
    total: totalOf(bills),
    paid: { count: paid.length, total: totalOf(paid) },
    dueSoon: { count: dueSoon.length, total: totalOf(dueSoon) },
    totalUpcoming: {
      count: upcoming.length + dueSoon.length,
      total: totalOf([...upcoming, ...dueSoon]),
    },
  };
}
