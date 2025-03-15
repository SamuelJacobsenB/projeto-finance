import fs from "fs";
import { global } from "@/global";
import { validateFolder } from "@core/validators";
import { FolderDto } from "@core/types";

export class FolderService {
  selectFolder(path: string): void {
    if (!path) {
      throw new Error("Você deve ter uma pasta selecionada");
    }

    const ifExists = fs.existsSync(path);

    if (!ifExists) {
      throw new Error("Pasta não encontrada");
    }

    global.defaultPath = path;
  }

  async createFolder(folderDto: FolderDto): Promise<string> {
    const { error, isValid } = validateFolder(folderDto);

    if (!isValid) {
      throw new Error(error);
    }

    if (!global.defaultPath) {
      throw new Error("Você deve ter uma pasta selecionada");
    }

    const folderPath = [
      global.defaultPath,
      folderDto.year,
      folderDto.month > 9 ? folderDto.month : "0" + folderDto.month,
    ].join("/");

    const ifExists = fs.existsSync(folderPath);

    if (!ifExists) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    return folderPath;
  }

  async readFolder(path: string): Promise<string[]> {
    if (!global.defaultPath) {
      throw new Error("Você deve ter uma pasta selecionada");
    }

    const newPath = [global.defaultPath, path.replace("-", "/")].join("/");

    const ifExists = fs.existsSync(newPath);

    if (!ifExists) {
      throw new Error("Pasta não encontrada");
    }

    const folderContent = fs.readdirSync(newPath, "utf-8");

    const fileNames = folderContent.map((file) => file.split(".")[0]);

    return fileNames;
  }
}
