export function formatCurrency(amount: number, sign: "always" | "auto" = "auto"): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));

  if (sign === "always") {
    const prefix = amount < 0 ? "-" : "";
    return `${prefix}${formatted}`;
  }

  if (amount < 0) {
    return `-${formatted}`;
  }

  return formatted;
}

export function formatSignedAmount(amount: number): string {
  return amount >= 0 ? `+${formatCurrency(amount)}` : formatCurrency(amount);
}

// A fixed list instead of Intl month names: ICU versions abbreviate some months
// differently (e.g. "Sept"), which would mismatch server and client renders.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ISO date-only strings parse as UTC midnight, so read UTC parts or the day
// shifts in negative-offset time zones.
export function formatTransactionDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
