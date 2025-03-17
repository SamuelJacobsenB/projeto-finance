import express, { Request, Response } from "express";
const router = express.Router();

import { FileService } from "../services";
import { FileDto } from "../../../../../core/dist/types";

const fileService = new FileService();

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const fileDto: FileDto = req.body;

  const response = await fileService.createFile(fileDto);

  if (response.error || !response.data) {
    return res.status(404).json({ error: response.error });
  }

  return res.status(201).json({ data: response.data });
});

export default router;
