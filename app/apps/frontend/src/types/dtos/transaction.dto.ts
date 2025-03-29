import { Value } from "../";

export interface TransactionDto {
  path: string;
  name: string;
  value: number;
  type: Value;
}
