import { BillsPanel } from "@/components/recurring/BillsPanel";
import { RecurringBillsSummary } from "@/components/recurring/RecurringBillsSummary";
import { getFinanceData } from "@/lib/data";
import { getBillSummary } from "@/lib/recurring";

export default function RecurringBillsPage() {
  const { recurringBills } = getFinanceData();
  const summary = getBillSummary(recurringBills);

  return (
    <main className="min-h-0 flex-1 px-10 pb-16 pt-10">
      <h1 className="text-preset-1 font-bold tracking-tight text-grey-900">
        Recurring Bills
      </h1>
      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
        <RecurringBillsSummary summary={summary} />
        <BillsPanel bills={recurringBills} />
      </div>
    </main>
  );
}
