import fs from "fs";
import { global } from "@/global";
import { FolderService } from "./";
import { defaultFileData } from "@/constants";
import { validateFile } from "@core/validators";
import { FileDto, File } from "@core/types";

const folderService = new FolderService();

export class FileService {
  async createFile(fileDto: FileDto): Promise<string> {
    const { error, isValid } = validateFile(fileDto);

    if (!isValid) {
      throw new Error(error);
    }

    const folderPath = await folderService.createFolder({
      year: fileDto.year,
      month: fileDto.month,
    });

    const filePath = [folderPath, fileDto.name + ".json"].join("/");

    fs.writeFileSync(filePath, JSON.stringify(defaultFileData, null, 2));

    return filePath;
  }

  async readFile(path: string): Promise<File> {
    if (!global.defaultPath) {
      throw new Error("Você deve ter uma pasta selecionada");
    }

    const newPath = [
      global.defaultPath,
      path.replace(/-/g, "/") + ".json",
    ].join("/");

    const ifExists = fs.existsSync(newPath);

    if (!ifExists) {
      throw new Error("Arquivo não encontrado");
    }

    const fileContent = fs.readFileSync(newPath, "utf-8");

    return JSON.parse(fileContent);
  }
}
