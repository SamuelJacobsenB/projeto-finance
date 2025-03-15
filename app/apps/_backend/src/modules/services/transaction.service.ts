import fs from "fs";
import { generateId } from "@/functions";
import { global } from "@/global";
import { FileService } from "./";
import { validateTransaction } from "@core/validators";
import { TransactionDto, File } from "@core/types";

const fileService = new FileService();

export class TransactionService {
  async transaction(transactionDto: TransactionDto) {
    const { error, isValid } = validateTransaction(transactionDto);

    if (!isValid) {
      throw new Error(error);
    }

    if (!global.defaultPath) {
      throw new Error("Você deve ter uma pasta selecionada");
    }

    const newPath = [
      global.defaultPath,
      transactionDto.path.replace(/-/g, "/") + ".json",
    ].join("/");

    const fileContent = await fileService.readFile(transactionDto.path);

    const day = Number(transactionDto.path.split("-")[2]);
    const id = generateId(day);

    if (transactionDto.type === "input") {
      fileContent.inputs.push({
        id,
        name: transactionDto.name,
        value: transactionDto.value,
      });
    } else {
      fileContent.outputs.push({
        id,
        name: transactionDto.name,
        value: transactionDto.value,
      });
    }

    fs.writeFileSync(newPath, JSON.stringify(fileContent, null, 2));

    return newPath;
  }

  async deleteTransaction(path: string, id: number) {
    if (!global.defaultPath) {
      throw new Error("Você deve ter uma pasta selecionada");
    }

    const newPath = [
      global.defaultPath,
      path.replace(/-/g, "/") + ".json",
    ].join("/");

    const fileContent: File = await fileService.readFile(path);

    fileContent.inputs = fileContent.inputs.filter((input) => input.id !== id);

    fileContent.outputs = fileContent.outputs.filter(
      (output) => output.id !== id
    );

    fs.writeFileSync(newPath, JSON.stringify(fileContent, null, 2));

    return newPath;
  }
}
