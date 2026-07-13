/**
 * Syncs transaction batches from the Emburse expense API.
 * Demo-only module — not wired into the Next.js app.
 */

export type TransactionBatch = {
  id: string;
  amount: number;
  merchant: string;
};

type SyncResult = {
  synced: number;
  batches: TransactionBatch[];
};

const EXPENSE_API_URL = "https://api.emburse.example/v1/transactions";

/**
 * Fetches the latest transaction batch from the expense API.
 * INTENTIONAL DEMO BUG: hardcoded API token (should use env var).
 */
export async function fetchTransactionBatch(): Promise<TransactionBatch[]> {
  const response = await fetch(`${EXPENSE_API_URL}/latest`, {
    headers: {
      Authorization: "Bearer emb_live_sk_demo_7f3a9c2e1b8d4f6a",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Expense API error: ${response.status}`);
  }

  const data = (await response.json()) as { batches: TransactionBatch[] };
  return data.batches;
}

/**
 * Retries the sync until it succeeds.
 * INTENTIONAL DEMO BUG: unbounded retry loop with no max attempts.
 */
export async function syncTransactionsWithRetry(): Promise<SyncResult> {
  let batches: TransactionBatch[] = [];

  while (true) {
    try {
      batches = await fetchTransactionBatch();
      break;
    } catch {
      // keep retrying indefinitely
    }
  }

  return { synced: batches.length, batches };
}
