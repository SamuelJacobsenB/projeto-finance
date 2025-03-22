import { FileService, FolderService } from "./";
import { Response, File } from "@/types";

export class AnalyzeService {
  private readonly fileService = new FileService();
  private readonly folderService = new FolderService();

  async analyzeFile(
    path: string
  ): Promise<
    Response<{ fileContent: File; totalInputs: number; totalOutputs: number }>
  > {
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

    return {
      data: {
        fileContent: fileContent.data,
        totalInputs,
        totalOutputs,
      },
    };
  }

  async analyzeMonth(path: string) {
    const fileNames = await this.folderService.readFolder(path);

    if (fileNames.error || !fileNames.data) {
      return { error: fileNames.error };
    }

    let totalInputs = 0;
    let totalOutputs = 0;

    fileNames.data.map(async (fileName) => {
      const filePath = [path, fileName].join("/");

      const { data } = await this.analyzeFile(filePath);

      if (data) {
        const { totalInputs: fileInputs, totalOutputs: fileOutputs } = data;

        totalInputs += fileInputs;
        totalOutputs += fileOutputs;
      }
    });

    return { data: { totalInputs, totalOutputs } };
  }

  async analyzeYear(
    path: string
  ): Promise<
    Response<{ balance: number; totalInputs: number; totalOutputs: number }>
  > {
    const folderNames = await this.folderService.readFolder(path);

    if (folderNames.error || !folderNames.data) {
      return { error: folderNames.error };
    }

    let totalInputs = 0;
    let totalOutputs = 0;

    folderNames.data.map(async (folderName) => {
      const folderPath = [path, folderName].join("/");

      const { data } = await this.analyzeMonth(folderPath);

      if (data) {
        const { totalInputs: folderInputs, totalOutputs: folderOutputs } = data;

        totalInputs += folderInputs;
        totalOutputs += folderOutputs;
      }
    });

    const balance = totalInputs - totalOutputs;

    return { data: { balance, totalInputs, totalOutputs } };
  }
}
