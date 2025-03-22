import fs from "fs";
import { configFile } from "@/constants";
import { ConfigFile } from "@/types";

export class ConfigService {
  async createConfigFile(path: string): Promise<void> {
    await fs.promises.writeFile(path, JSON.stringify(configFile));
  }

  async readConfigFile(path: string): Promise<ConfigFile> {
    const fileContent = fs.readFileSync(path);
    return JSON.parse(fileContent.toString());
  }
}
