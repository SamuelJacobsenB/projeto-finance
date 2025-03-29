import fs from "fs";
import { generateId } from "@/functions";
import { global } from "@/global";
import { FileService } from "./";
import { validateTransaction } from "@/validators";
import { TransactionDto, Response } from "@/types";

export class TransactionService {
  private readonly fileService = new FileService();

  async transaction(transactionDto: TransactionDto): Promise<Response<string>> {
    const { error, isValid } = validateTransaction(transactionDto);

    if (!isValid) {
      return { error };
    }

    if (!global.defaultPath) {
      return { error: "Você deve ter uma pasta selecionada" };
    }

    const fileContent = await this.fileService.readFile(transactionDto.path);

    if (fileContent.error || !fileContent.data) {
      return { error: fileContent.error };
    }

    const newPath = [
      global.defaultPath,
      transactionDto.path.replace(/-/g, "/") + ".json",
    ].join("/");

    const day = Number(transactionDto.path.split("-")[2]);
    const id = generateId(day);

    if (transactionDto.type === "input") {
      fileContent.data.inputs.push({
        id,
        name: transactionDto.name,
        value: transactionDto.value,
      });
    } else {
      fileContent.data.outputs.push({
        id,
        name: transactionDto.name,
        value: transactionDto.value,
      });
    }

    fs.writeFileSync(newPath, JSON.stringify(fileContent.data, null, 2));

    return { data: newPath };
  }

  async deleteTransaction(path: string, id: number): Promise<Response<string>> {
    if (!global.defaultPath) {
      return { error: "Você deve ter uma pasta selecionada" };
    }

    const fileContent = await this.fileService.readFile(path);

    if (fileContent.error || !fileContent.data) {
      return { error: fileContent.error };
    }

    const newPath = [
      global.defaultPath,
      path.replace(/-/g, "/") + ".json",
    ].join("/");

    console.log(fileContent.data.outputs);

    fileContent.data.inputs = fileContent.data.inputs.filter(
      (input) => input.id !== id
    );

    fileContent.data.outputs = fileContent.data.outputs.filter(
      (output) => output.id !== id
    );

    fs.writeFileSync(newPath, JSON.stringify(fileContent.data, null, 2));

    return { data: newPath };
  }
}
