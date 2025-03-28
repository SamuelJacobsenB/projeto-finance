import { File } from "../";

export interface DayBalance {
  day?: string;
  fileContent?: File;
  balance: number;
  totalInputs: number;
  totalOutputs: number;
}
