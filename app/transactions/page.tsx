import { TransactionsList } from "@/components/transactions/TransactionsList";
import { Card } from "@/components/ui/Card";
import { getAllTransactions, getFinanceData } from "@/lib/data";

export default function TransactionsPage() {
  const data = getFinanceData();
  const transactions = getAllTransactions(data);

  return (
    <main className="min-h-0 flex-1 px-10 pb-16 pt-10">
      <h1 className="text-preset-1 font-bold tracking-tight text-grey-900">
        Transactions
      </h1>
      <div className="mt-8">
        <Card>
          <TransactionsList transactions={transactions} />
        </Card>
      </div>
    </main>
  );
}
