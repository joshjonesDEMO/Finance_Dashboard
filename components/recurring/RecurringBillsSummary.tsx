import { ReceiptIcon } from "./BillIcons";
import { formatCurrency } from "@/lib/format";
import type { BillSummary } from "@/lib/recurring";

function SummaryRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 text-preset-5 ${
        emphasis ? "text-secondary-red" : ""
      }`}
    >
      <span className={emphasis ? "" : "text-grey-500"}>{label}</span>
      <span
        className={`text-preset-5-bold text-right ${
          emphasis ? "" : "text-grey-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function RecurringBillsSummary({ summary }: { summary: BillSummary }) {
  const format = (entry: { count: number; total: number }) =>
    `${entry.count} (${formatCurrency(entry.total)})`;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:w-[337px] lg:shrink-0 lg:flex-col">
      <div className="flex flex-col gap-8 rounded-xl bg-grey-900 p-6 text-white">
        <ReceiptIcon className="size-10" />
        <div className="flex flex-col gap-3">
          <p className="text-preset-4">Total Bills</p>
          <p className="text-preset-1 font-bold">
            {formatCurrency(summary.total)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-xl bg-white p-5">
        <h2 className="text-preset-3 text-grey-900">Summary</h2>
        <div className="flex flex-col gap-4">
          <SummaryRow label="Paid Bills" value={format(summary.paid)} />
          <div className="h-px w-full bg-grey-500/15" />
          <SummaryRow
            label="Total Upcoming"
            value={format(summary.totalUpcoming)}
          />
          <div className="h-px w-full bg-grey-500/15" />
          <SummaryRow label="Due Soon" value={format(summary.dueSoon)} emphasis />
        </div>
      </div>
    </div>
  );
}
