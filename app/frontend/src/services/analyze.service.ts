import { TotalBalance } from "@/types/other/total-balance.type";
import { FileService, FolderService } from "./";
import { Response, YearBalance, MonthBalance, DayBalance } from "@/types";

export class AnalyzeService {
  private readonly fileService = new FileService();
  private readonly folderService = new FolderService();

  async analyzeFile(path: string): Promise<Response<DayBalance>> {
    const fileContent = await this.fileService.readFile(path);

    if (fileContent.error || !fileContent.data) {
      return { error: fileContent.error };
    }

    const totalInputs = fileContent.data.inputs.reduce(
      (totalInputs, input) => totalInputs + input.value,
      0
    );

    const totalOutputs = fileContent.data.outputs.reduce(
      (totalOutputs, output) => totalOutputs + output.value,
      0
    );

    const balance = totalInputs - totalOutputs;

    return {
      data: {
        fileContent: fileContent.data,
        balance,
        totalInputs,
        totalOutputs,
      },
    };
  }

  async analyzeMonth(path: string): Promise<Response<MonthBalance>> {
    const fileNames = await this.folderService.readFolder(path);

    if (fileNames.error || !fileNames.data) {
      return { error: fileNames.error };
    }

    let totalInputs = 0;
    let totalOutputs = 0;
    const dayBalances: DayBalance[] = [];

    fileNames.data.map(async (fileName) => {
      const filePath = [path, fileName.split(".")[0]].join("/");

      const { data } = await this.analyzeFile(filePath);

      if (data) {
        const { totalInputs: fileInputs, totalOutputs: fileOutputs } = data;

        totalInputs += fileInputs;
        totalOutputs += fileOutputs;

        const dayBalance = fileInputs - fileOutputs;

        dayBalances.push({
          day: fileName.split(".")[0],
          balance: dayBalance,
          totalInputs: fileInputs,
          totalOutputs: fileOutputs,
        });
      }
    });

    const balance = totalInputs - totalOutputs;

    return { data: { balance, totalInputs, totalOutputs } };
  }

  async analyzeYear(path: string): Promise<Response<YearBalance>> {
    const folderNames = await this.folderService.readFolder(path);

    if (folderNames.error || !folderNames.data) {
      return { error: folderNames.error };
    }

    let totalInputs = 0;
    let totalOutputs = 0;
    const monthBalances: MonthBalance[] = [];

    folderNames.data.map(async (folderName) => {
      const folderPath = [path, folderName].join("/");

      const { data } = await this.analyzeMonth(folderPath);

      if (data) {
        const { totalInputs: folderInputs, totalOutputs: folderOutputs } = data;

        totalInputs += folderInputs;
        totalOutputs += folderOutputs;

        const monthBalance = folderInputs - folderOutputs;

        monthBalances.push({
          month: folderName,
          balance: monthBalance,
          totalInputs: folderInputs,
          totalOutputs: folderOutputs,
        });
      }
    });

    const balance = totalInputs - totalOutputs;

    return { data: { balance, totalInputs, totalOutputs, monthBalances } };
  }

  async analyzeAll(): Promise<Response<TotalBalance>> {
    const folderNames = await this.folderService.readFolder("");

    if (folderNames.error || !folderNames.data) {
      return { error: folderNames.error };
    }

    let totalInputs = 0;
    let totalOutputs = 0;
    const yearBalances: YearBalance[] = [];

    folderNames.data.map(async (folderName) => {
      if (folderName.length === 4) {
        const { data } = await this.analyzeYear(folderName);

        if (data) {
          const { totalInputs: folderInputs, totalOutputs: folderOutputs } =
            data;

          totalInputs += folderInputs;
          totalOutputs += folderOutputs;

          const yearBalance = folderInputs - folderOutputs;

          yearBalances.push({
            year: folderName,
            balance: yearBalance,
            totalInputs: folderInputs,
            totalOutputs: folderOutputs,
          });
        }
      }
    });

    const balance = totalInputs - totalOutputs;

    return { data: { balance, totalInputs, totalOutputs, yearBalances } };
  }
}
