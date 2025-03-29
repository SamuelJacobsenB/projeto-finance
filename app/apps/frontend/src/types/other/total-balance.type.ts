import { YearBalance } from "./year-balance.type";

export interface TotalBalance {
  balance: number;
  totalInputs: number;
  totalOutputs: number;
  yearBalances?: YearBalance[];
}
