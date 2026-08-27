import type { Transaction } from "@/lib/types";
import { TransactionListItem } from "./TransactionListItem";

type TransactionsListProps = {
  transactions: Transaction[];
};

export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <ul className="flex flex-col" aria-label="All transactions">
      {transactions.map((tx, i) => (
        <TransactionListItem
          key={`${tx.name}-${tx.date}-${i}`}
          transaction={tx}
        />
      ))}
    </ul>
  );
}
