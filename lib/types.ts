export type Balance = {
  current: number;
  income: number;
  expenses: number;
};

export type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

export type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

export type Budget = {
  category: string;
  maximum: number;
  spent: number;
  theme: string;
};

export type RecurringBillStatus = "paid" | "upcoming" | "dueSoon";

export type RecurringBill = {
  name: string;
  /** Slug matching the avatar file under public/bills/avatars/<avatar>.png */
  avatar: string;
  /** Day of the month the bill recurs on (1-31) */
  dayOfMonth: number;
  status: RecurringBillStatus;
  /** Positive dollar cost of the bill */
  amount: number;
};

export type FinanceData = {
  balance: Balance;
  pots: Pot[];
  transactions: Transaction[];
  budgets: Budget[];
  recurringBills: RecurringBill[];
};
