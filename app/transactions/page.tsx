import { TransactionsList } from "@/components/transactions/TransactionsList";
import {
  getFinanceData,
  getTransactionsNewestFirst,
} from "@/lib/data";

export default function TransactionsPage() {
  const transactions = getTransactionsNewestFirst(getFinanceData());

  return (
    <main className="min-h-0 min-w-0 flex-1 px-4 pb-16 pt-6 md:px-10 md:pt-10">
      <h1 className="text-preset-1 font-bold tracking-tight text-grey-900">
        Transactions
      </h1>
      <div className="mt-8">
        <TransactionsList transactions={transactions} />
      </div>
    </main>
  );
}
