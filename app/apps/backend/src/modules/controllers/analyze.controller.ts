import express, { Request, Response } from "express";
const router = express.Router();

import { AnalyzeService } from "../services";
const analyzeService = new AnalyzeService();

router.get("/file/:path", async (req: Request, res: Response): Promise<any> => {
  const { path } = req.params;

  const response = await analyzeService.analyzeFile(path);

  if (response.error || !response.data) {
    return res.status(404).json({ error: response.error });
  }

  return res.status(200).json({ data: response.data });
});

router.get(
  "/month/:path",
  async (req: Request, res: Response): Promise<any> => {
    const { path } = req.params;

    const response = await analyzeService.analyzeMonth(path);

    if (response.error || !response.data) {
      return res.status(404).json({ error: response.error });
    }

    return res.status(200).json({ data: response.data });
  }
);

router.get("/year/:path", async (req: Request, res: Response): Promise<any> => {
  const { path } = req.params;

  const response = await analyzeService.analyzeYear(path);

  if (response.error || !response.data) {
    return res.status(404).json({ error: response.error });
  }

  return res.status(200).json({ data: response.data });
});

export default router;
