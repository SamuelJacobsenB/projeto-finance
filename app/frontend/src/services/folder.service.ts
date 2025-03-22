import fs from "fs";
import { global } from "@/global";
import { ConfigService } from "./";
import { validateFolder } from "@/validators";
import { FolderDto, Response } from "@/types";

export class FolderService {
  private readonly configService = new ConfigService();

  async selectFolder(path: string): Promise<Response<string>> {
    if (!path) {
      return { error: "Você deve ter uma pasta selecionada" };
    }

    const ifExists = fs.existsSync(path);

    if (!ifExists) {
      return { error: "Pasta não encontrada" };
    }

    const configFilePath = [path, "config.json"].join("/");

    const ifConfigFileExists = fs.existsSync(configFilePath);

    if (!ifConfigFileExists) {
      await this.configService.createConfigFile(configFilePath);
    }

    global.defaultPath = path;

    return { data: path };
  }

  async createFolder(folderDto: FolderDto): Promise<Response<string>> {
    const { error, isValid } = validateFolder(folderDto);

    if (!isValid) {
      return { error };
    }

    if (!global.defaultPath) {
      return { error: "Você deve ter uma pasta selecionada" };
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

    return { data: folderPath };
  }

  async readFolder(path: string): Promise<Response<string[]>> {
    if (!global.defaultPath) {
      return { error: "Você deve ter uma pasta selecionada" };
    }

    const newPath = [global.defaultPath, path.replace(/-/g, "/")].join("/");

    const ifExists = fs.existsSync(newPath);

    if (!ifExists) {
      return { error: "Pasta não encontrada" };
    }

    const folderContent = fs.readdirSync(newPath, "utf-8");

    const fileNames = folderContent.map((file) => file.split(".")[0]);

    return { data: fileNames };
  }
}
