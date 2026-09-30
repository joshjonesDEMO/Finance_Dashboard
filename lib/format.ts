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

// ISO date-only strings parse as UTC midnight, so formatting must also use UTC
// or the day shifts in negative-offset time zones.
const transactionDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatTransactionDate(iso: string): string {
  return transactionDateFormat.format(new Date(iso));
}
