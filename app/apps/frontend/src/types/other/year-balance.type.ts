import { MonthBalance } from "../";

export interface YearBalance {
  year?: string;
  balance: number;
  totalInputs: number;
  totalOutputs: number;
  monthBalances?: MonthBalance[];
}
