import { Card } from "@/components/ui/Card";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { getFinanceData } from "@/lib/data";

export default function TransactionsPage() {
  const { transactions } = getFinanceData();

  return (
    <main className="min-h-0 flex-1 px-4 pb-16 pt-10 sm:px-10">
      <h1 className="text-preset-1 font-bold tracking-tight text-grey-900">
        Transactions
      </h1>
      <Card className="mt-8 sm:px-8 sm:py-8">
        <TransactionsView transactions={transactions} />
      </Card>
    </main>
  );
}
