import { DayBalance } from "./day-balance.type";

export interface MonthBalance {
  month?: string;
  balance: number;
  totalInputs: number;
  totalOutputs: number;
  dayBalances?: DayBalance[];
}
