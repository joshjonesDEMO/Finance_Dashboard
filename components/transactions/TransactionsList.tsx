import { TransactionAvatar } from "@/components/transactions/TransactionAvatar";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/format";
import type { Transaction } from "@/lib/types";

type TransactionsListProps = {
  transactions: Transaction[];
};

function formatDisplayDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

const gridColumns =
  "md:grid-cols-[minmax(0,1fr)_80px_88px_88px] xl:grid-cols-[minmax(0,1fr)_120px_120px_200px]";

export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <Card>
      <div className="-mx-1 md:m-2">
        <div
          className={`hidden items-center gap-x-4 pb-4 text-preset-5 text-grey-500 md:grid ${gridColumns}`}
          aria-hidden
        >
          <span>Recipient / Sender</span>
          <span>Category</span>
          <span>Transaction Date</span>
          <span className="text-right">Amount</span>
        </div>

        <ul aria-label="All transactions">
          {transactions.map((transaction, index) => {
            const isCredit = transaction.amount >= 0;

            return (
              <li
                key={`${transaction.name}-${transaction.date}-${index}`}
                className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-grey-100 py-4 last:border-b-0 ${gridColumns}`}
              >
                <div className="flex min-w-0 items-center gap-3 md:gap-4">
                  <TransactionAvatar
                    transaction={transaction}
                    responsive
                  />
                  <p className="min-w-0 truncate text-preset-4-bold text-grey-900">
                    {transaction.name}
                  </p>
                </div>

                <p className="col-start-1 row-start-2 ml-11 mt-1 truncate text-preset-5 text-grey-500 md:col-auto md:row-auto md:m-0">
                  {transaction.category}
                </p>

                <time
                  dateTime={transaction.date}
                  className="col-start-2 row-start-2 whitespace-nowrap text-right text-preset-5 text-grey-500 md:col-auto md:row-auto md:text-left"
                >
                  {formatDisplayDate(transaction.date)}
                </time>

                <p
                  className={`col-start-2 row-start-1 whitespace-nowrap text-right text-preset-4-bold md:col-auto md:row-auto ${
                    isCredit ? "text-secondary-green" : "text-grey-900"
                  }`}
                >
                  {isCredit ? "+" : ""}
                  {formatCurrency(transaction.amount)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
