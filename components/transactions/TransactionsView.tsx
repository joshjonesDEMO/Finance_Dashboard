"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Pagination } from "@/components/transactions/Pagination";
import { TransactionAvatar } from "@/components/transactions/TransactionAvatar";
import { formatSignedAmount, formatTransactionDate } from "@/lib/format";
import {
  ALL_CATEGORIES,
  SORT_OPTIONS,
  filterTransactions,
  getCategories,
  paginate,
  sortTransactions,
  type SortOption,
} from "@/lib/transactions";
import type { Transaction } from "@/lib/types";

type TransactionsViewProps = {
  transactions: Transaction[];
};

const fieldClass =
  "h-10 rounded-lg border border-beige-500 bg-white text-preset-4 text-grey-900 outline-none focus-visible:border-grey-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-900";

type SelectProps = {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
};

function LabelledSelect({ id, label, value, options, onChange }: SelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-preset-4 text-grey-500 whitespace-nowrap">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} appearance-none py-0 pl-5 pr-11`}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-grey-900"
          aria-hidden
        />
      </div>
    </div>
  );
}

export function TransactionsView({ transactions }: TransactionsViewProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("Latest");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => [ALL_CATEGORIES, ...getCategories(transactions)],
    [transactions],
  );
  const visible = useMemo(
    () => sortTransactions(filterTransactions(transactions, query, category), sort),
    [transactions, query, category, sort],
  );
  const current = paginate(visible, page);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <label htmlFor="transactions-search" className="sr-only">
            Search transaction
          </label>
          <input
            id="transactions-search"
            type="search"
            placeholder="Search transaction"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className={`${fieldClass} w-full py-0 pl-5 pr-12 placeholder:text-beige-500`}
          />
          <Search
            className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-grey-900"
            aria-hidden
          />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <LabelledSelect
            id="transactions-sort"
            label="Sort by"
            value={sort}
            options={SORT_OPTIONS}
            onChange={(value) => {
              setSort(value as SortOption);
              setPage(1);
            }}
          />
          <LabelledSelect
            id="transactions-category"
            label="Category"
            value={category}
            options={categories}
            onChange={(value) => {
              setCategory(value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <p role="status" className="sr-only">
        {visible.length} {visible.length === 1 ? "transaction" : "transactions"} found
      </p>

      {current.items.length === 0 ? (
        <p className="py-10 text-center text-preset-4 text-grey-500">No transactions found.</p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-grey-100 text-left text-preset-5 text-grey-500">
                <th scope="col" className="py-3 pr-4 font-normal">
                  Recipient / Sender
                </th>
                <th scope="col" className="hidden whitespace-nowrap py-3 pr-4 font-normal md:table-cell md:w-48">
                  Category
                </th>
                <th scope="col" className="hidden whitespace-nowrap py-3 pr-4 font-normal md:table-cell md:w-48">
                  Transaction Date
                </th>
                <th scope="col" className="py-3 text-right font-normal">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {current.items.map((tx, i) => (
                <tr
                  key={`${tx.name}-${tx.date}-${i}`}
                  className="border-b border-grey-100 last:border-b-0"
                >
                  <td className="w-full max-w-0 py-4 pr-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <TransactionAvatar tx={tx} />
                      <div className="min-w-0">
                        <p className="truncate text-preset-4-bold text-grey-900">{tx.name}</p>
                        <p className="mt-1 text-preset-5 text-grey-500 md:hidden">
                          {tx.category} • {formatTransactionDate(tx.date)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap py-4 pr-4 text-preset-5 text-grey-500 md:table-cell">
                    {tx.category}
                  </td>
                  <td className="hidden whitespace-nowrap py-4 pr-4 text-preset-5 text-grey-500 md:table-cell">
                    {formatTransactionDate(tx.date)}
                  </td>
                  <td className="py-4 text-right">
                    <span
                      className={`text-preset-4-bold whitespace-nowrap ${
                        tx.amount >= 0 ? "text-secondary-green" : "text-grey-900"
                      }`}
                    >
                      {formatSignedAmount(tx.amount)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={current.page} pageCount={current.pageCount} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
