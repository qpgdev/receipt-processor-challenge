import express from "express";
import ReceiptsController from "../controllers/ReceiptsController";


const router = express.Router();

router.post("/receipts/process", async (req, res) => {
  const controller = new ReceiptsController();
  const response = await controller.processReceipt(req.body);
  res.send(response);
  return;
});

router.get("/receipts/:id/points", async (req, res) => {
  const { id } = req.params;
  const controller = new ReceiptsController();
  const response = await controller.getPoints(id);
  res.send(response);
  return;
});

export default router;
