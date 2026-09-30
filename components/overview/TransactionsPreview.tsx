import Link from "next/link";
import { TransactionAvatar } from "@/components/transactions/TransactionAvatar";
import type { Transaction } from "@/lib/types";
import { formatSignedAmount, formatTransactionDate } from "@/lib/format";

type TransactionsPreviewProps = {
  transactions: Transaction[];
};

export function TransactionsPreview({ transactions }: TransactionsPreviewProps) {
  return (
    <section className="rounded-2xl bg-white px-6 py-6">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-preset-2 text-grey-900">Transactions</h2>
        <Link
          href="/transactions"
          className="text-preset-4 font-medium text-grey-500 underline-offset-4 hover:text-grey-900 hover:underline"
        >
          See Details
        </Link>
      </div>
      <ul className="mt-8 flex flex-col" aria-label="Recent transactions">
        {transactions.map((tx, i) => (
          <li
            key={`${tx.name}-${tx.date}-${i}`}
            className="flex items-center gap-4 border-b border-beige-100 py-4 last:border-b-0"
          >
            <TransactionAvatar tx={tx} />
            <div className="min-w-0 flex-1">
              <p className="text-preset-4-bold text-grey-900 truncate">
                {tx.name}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0 text-preset-5 text-grey-500">
                <span>{tx.category}</span>
                <span aria-hidden>•</span>
                <span>{formatTransactionDate(tx.date)}</span>
              </div>
            </div>
            <p
              className={`text-preset-4-bold shrink-0 ${
                tx.amount >= 0 ? "text-secondary-green" : "text-grey-900"
              }`}
            >
              {formatSignedAmount(tx.amount)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
