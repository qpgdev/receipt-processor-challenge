import express, { Application } from "express";
import morgan from "morgan";
import ReceiptsRouter from "./routes/receiptsRoutes";
import { ReceiptData } from "./types/receiptTypes"

export const receiptStore = new Map<string, ReceiptData>();

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(ReceiptsRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
})
