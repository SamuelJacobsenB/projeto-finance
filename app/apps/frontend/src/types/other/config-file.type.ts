export interface FinanceNames {
  name: string;
  color: string;
}

export type Currency = "USD" | "EUR" | "BRL";

export interface ConfigFile {
  input_names: FinanceNames[];
  output_names: FinanceNames[];
  currency: Currency;
}
