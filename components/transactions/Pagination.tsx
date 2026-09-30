import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const buttonBase =
  "flex h-10 items-center justify-center rounded-lg border text-preset-4 transition-colors disabled:cursor-not-allowed disabled:opacity-40";
const idle = "border-beige-500 bg-white text-grey-900 enabled:hover:bg-beige-500 enabled:hover:text-white";

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
      <button
        type="button"
        className={`${buttonBase} ${idle} gap-4 px-4`}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4 text-grey-500" aria-hidden />
        <span className="max-sm:sr-only">Prev</span>
      </button>
      <ul className="flex items-center gap-2">
        {pages.map((n) => {
          const current = n === page;
          return (
            <li key={n}>
              <button
                type="button"
                aria-label={`Page ${n}`}
                aria-current={current ? "page" : undefined}
                className={`${buttonBase} size-10 ${
                  current ? "border-grey-900 bg-grey-900 text-white" : idle
                }`}
                onClick={() => onPageChange(n)}
              >
                {n}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={`${buttonBase} ${idle} gap-4 px-4`}
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <span className="max-sm:sr-only">Next</span>
        <ChevronRight className="size-4 text-grey-500" aria-hidden />
      </button>
    </nav>
  );
}
