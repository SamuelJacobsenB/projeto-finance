import express, { Request, Response } from "express";
const router = express.Router();

import { FolderService } from "../services";

const folderService = new FolderService();

router.post("/select/:path", (req: Request, res: Response): any => {
  const path = req.params.path;

  const response = folderService.selectFolder(path);

  if (response.error || !response.data) {
    return res.status(404).json({ error: response.error });
  }

  return res.status(200).json({ data: response.data });
});

export default router;
