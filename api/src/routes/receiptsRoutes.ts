import express from "express";
import ReceiptsController from "../controllers/ReceiptsController";

const router = express.Router();

router.get("/receipts", async (_req, res) => {
  const controller = new ReceiptsController();
  const response = await controller.processReceipt();
  res.send(response);
  return;
});

export default router;
