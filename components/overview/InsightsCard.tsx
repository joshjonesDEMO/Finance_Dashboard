import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/format";
import { getBudgetsAtRisk, getSavingsRate } from "@/lib/insights";
import { getThemeColor } from "@/lib/theme";
import type { Balance, Budget } from "@/lib/types";

type InsightsCardProps = {
  balance: Balance;
  budgets: Budget[];
};

export function InsightsCard({ balance, budgets }: InsightsCardProps) {
  const savingsRate = getSavingsRate(balance);
  const atRisk = getBudgetsAtRisk(budgets, 3);

  return (
    <Card>
      <h2 className="text-preset-2 text-grey-900">Insights</h2>
      <div className="mt-6 flex flex-col gap-2">
        <p className="text-preset-4 text-grey-500">Savings rate</p>
        <p className="text-preset-1 font-bold tracking-tight text-grey-900">
          {savingsRate}%
        </p>
      </div>
      <div className="mt-8">
        <p className="text-preset-4 text-grey-500">Budgets to watch</p>
        <ul className="mt-3 flex flex-col gap-3">
          {atRisk.map((b) => {
            const remaining = b.maximum - b.spent;
            return (
              <li key={b.category} className="flex items-center gap-3">
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: getThemeColor(b.theme) }}
                  aria-hidden
                />
                <span className="text-preset-4 flex-1 text-grey-500">
                  {b.category}
                </span>
                <span className="text-preset-4-bold text-grey-900">
                  {formatCurrency(remaining, "always")} left
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}
