import { promises as fs } from "fs";

import { configFile } from "@/constants";
import { ConfigFile } from "@/types";

export class ConfigService {
  async createConfigFile(path: string): Promise<void> {
    await fs.writeFile(path, JSON.stringify(configFile));
  }

  async readConfigFile(path: string): Promise<ConfigFile> {
    const fileContent = await fs.readFile(path);
    return JSON.parse(fileContent.toString());
  }
}
