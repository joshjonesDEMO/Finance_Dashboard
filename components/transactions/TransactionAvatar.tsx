import { getThemeColor } from "@/lib/theme";
import type { Transaction } from "@/lib/types";

const AVATAR_ACCENTS: Record<string, string> = {
  emma: "var(--color-secondary-cyan)",
  urban: "var(--color-secondary-green)",
  savory: "var(--color-secondary-yellow)",
  floral: "var(--color-secondary-purple)",
  spark: "var(--color-secondary-yellow)",
  ledger: "var(--color-secondary-navy)",
  trail: "var(--color-extended-brown)",
  north: "var(--color-extended-blue)",
  ember: "var(--color-extended-orange)",
  water: "var(--color-secondary-cyan)",
  net: "var(--color-extended-magenta)",
};

type TransactionAvatarProps = {
  transaction: Transaction;
  responsive?: boolean;
};

export function TransactionAvatar({
  transaction,
  responsive = false,
}: TransactionAvatarProps) {
  const accent =
    AVATAR_ACCENTS[transaction.avatar] ?? getThemeColor("navy");
  const initial = transaction.name.trim().charAt(0).toUpperCase();
  const className = responsive
    ? "flex size-8 shrink-0 items-center justify-center rounded-full text-preset-3 font-bold text-white md:size-10"
    : "flex size-10 shrink-0 items-center justify-center rounded-full text-preset-3 font-bold text-white";

  return (
    <div
      className={className}
      style={{ backgroundColor: accent }}
      aria-hidden
    >
      {initial}
    </div>
  );
}
