import express, { Request, Response } from "express";
const router = express.Router();

import { TransactionService } from "../services";
import { TransactionDto } from "../../../../../core/dist/types";

const transactionService = new TransactionService();

router.patch("/", async (req: Request, res: Response): Promise<any> => {
  const transactionDto: TransactionDto = req.body;

  const response = await transactionService.transaction(transactionDto);

  if (response.error || !response.data) {
    return res.status(400).json({ error: response.error });
  }

  return res.status(200).json({ data: response.data });
});

router.delete(
  "/:path/:id",
  async (req: Request, res: Response): Promise<any> => {
    const { path, id } = req.params;

    const response = await transactionService.deleteTransaction(
      path,
      Number(id)
    );

    if (response.error || !response.data) {
      return res.status(400).json({ error: response.error });
    }

    return res.status(200).json({ data: response.data });
  }
);

export default router;
