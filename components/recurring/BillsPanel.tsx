"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CaretDownIcon, DueSoonIcon, PaidIcon, SearchIcon } from "./BillIcons";
import { formatCurrency } from "@/lib/format";
import {
  billAvatarSrc,
  filterBills,
  formatDueDate,
  sortBills,
  SORT_OPTIONS,
  type SortOption,
} from "@/lib/recurring";
import type { RecurringBill } from "@/lib/types";

function SortControl({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (next: SortOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLabel =
    SORT_OPTIONS.find((option) => option.value === value)?.label ?? "";

  useEffect(() => {
    if (!open) {
      return;
    }
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div className="flex items-center gap-2">
      <span className="whitespace-nowrap text-preset-4 text-grey-500">
        Sort by
      </span>
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Sort by"
          className="flex items-center gap-4 rounded-lg border border-beige-500 bg-white px-5 py-3 text-preset-4 text-grey-900"
        >
          <span className="whitespace-nowrap">{currentLabel}</span>
          <CaretDownIcon
            className={`size-4 shrink-0 text-grey-900 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        {open ? (
          <ul
            role="listbox"
            aria-label="Sort bills by"
            className="absolute right-0 z-10 mt-2 min-w-[114px] rounded-lg bg-white py-3 shadow-[0_4px_24px_rgba(32,31,36,0.25)]"
          >
            {SORT_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`block w-full whitespace-nowrap px-5 py-1.5 text-left text-preset-4 text-grey-900 hover:font-bold ${
                    option.value === value ? "font-bold" : ""
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function BillRow({ bill }: { bill: RecurringBill }) {
  const isPaid = bill.status === "paid";
  const isDueSoon = bill.status === "dueSoon";

  return (
    <li className="flex items-center gap-8 px-4 py-4">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Image
          src={billAvatarSrc(bill)}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-full"
        />
        <p className="truncate text-preset-4-bold text-grey-900">{bill.name}</p>
      </div>
      <div className="flex w-[120px] shrink-0 items-center gap-2">
        <span
          className={`whitespace-nowrap text-preset-5 ${
            isPaid ? "text-secondary-green" : "text-grey-500"
          }`}
        >
          {formatDueDate(bill.dayOfMonth)}
        </span>
        {isPaid ? <PaidIcon className="size-4 shrink-0 text-secondary-green" /> : null}
        {isDueSoon ? (
          <DueSoonIcon className="size-4 shrink-0 text-secondary-red" />
        ) : null}
      </div>
      <p
        className={`w-[100px] shrink-0 text-right text-preset-4-bold ${
          isDueSoon ? "text-secondary-red" : "text-grey-900"
        }`}
      >
        {formatCurrency(bill.amount)}
      </p>
    </li>
  );
}

export function BillsPanel({ bills }: { bills: RecurringBill[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");

  const visibleBills = useMemo(
    () => sortBills(filterBills(bills, query), sort),
    [bills, query, sort],
  );

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-6 rounded-xl bg-white p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-[320px]">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search bills"
            aria-label="Search bills"
            className="w-full rounded-lg border border-beige-500 bg-white py-3 pl-5 pr-11 text-preset-4 text-grey-900 placeholder:text-beige-500 focus:border-grey-900 focus:outline-none"
          />
          <SearchIcon className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-grey-900" />
        </div>
        <SortControl value={sort} onChange={setSort} />
      </div>

      <div>
        <div className="flex items-center gap-8 border-b border-grey-100 px-4 py-3 text-preset-5 text-grey-500">
          <span className="min-w-0 flex-1">Bill Title</span>
          <span className="w-[120px] shrink-0">Due Date</span>
          <span className="w-[100px] shrink-0 text-right">Amount</span>
        </div>
        {visibleBills.length > 0 ? (
          <ul className="divide-y divide-grey-100">
            {visibleBills.map((bill) => (
              <BillRow key={bill.name} bill={bill} />
            ))}
          </ul>
        ) : (
          <p className="py-12 text-center text-preset-4 text-grey-500">
            No bills found.
          </p>
        )}
      </div>
    </section>
  );
}
