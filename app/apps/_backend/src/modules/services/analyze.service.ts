import { FileService, FolderService } from "./";

const fileService = new FileService();
const folderService = new FolderService();

export class AnalyzeService {
  async analyzeFile(path: string) {
    const fileContent = await fileService.readFile(path);

    const totalInputs = fileContent.inputs.reduce(
      (totalInputs, input) => totalInputs + input.value,
      0
    );

    const totalOutputs = fileContent.outputs.reduce(
      (totalOutputs, output) => totalOutputs + output.value,
      0
    );

    return { fileContent, totalInputs, totalOutputs };
  }

  async analyzeMonth(path: string) {
    const fileNames = await folderService.readFolder(path);

    let totalInputs = 0;
    let totalOutputs = 0;

    fileNames.map(async (fileName) => {
      const filePath = [path, fileName].join("/");

      const { totalInputs: fileInputs, totalOutputs: fileOutputs } =
        await this.analyzeFile(filePath);

      totalInputs += fileInputs;
      totalOutputs += fileOutputs;
    });

    return { totalInputs, totalOutputs };
  }

  async analyzeYear(path: string) {
    const folderNames = await folderService.readFolder(path);

    let totalInputs = 0;
    let totalOutputs = 0;

    folderNames.map(async (folderName) => {
      const folderPath = [path, folderName].join("/");

      const { totalInputs: folderInputs, totalOutputs: folderOutputs } =
        await this.analyzeMonth(folderPath);

      totalInputs += folderInputs;
      totalOutputs += folderOutputs;
    });

    const balance = totalInputs - totalOutputs;

    return { balance, totalInputs, totalOutputs };
  }
}
