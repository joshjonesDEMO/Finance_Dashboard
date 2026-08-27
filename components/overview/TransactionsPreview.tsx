import type { Transaction } from "@/lib/types";
import { TransactionListItem } from "@/components/transactions/TransactionListItem";

type TransactionsPreviewProps = {
  transactions: Transaction[];
};

export function TransactionsPreview({ transactions }: TransactionsPreviewProps) {
  return (
    <section className="rounded-2xl bg-white px-6 py-6">
      <h2 className="text-preset-2 text-grey-900">Transactions</h2>
      <ul className="mt-8 flex flex-col" aria-label="Recent transactions">
        {transactions.map((tx, i) => (
          <TransactionListItem
            key={`${tx.name}-${tx.date}-${i}`}
            transaction={tx}
          />
        ))}
      </ul>
    </section>
  );
}
