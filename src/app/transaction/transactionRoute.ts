import { Router } from "express";
import {
  UpdatePaymentTransactionController,
  UpdateToPaidTransactionController,
  cancelTransactioController,
  createTransactionController,
  customUpdateStatusTransactionController,
  getHistoryByTransactionIdController,
  getMonthTransactionController,
  getTodayTransactionController,
  getTransactionByIdController,
  getTransactionController,
  getTransactionDetailsByTransactionIdController,
  getWeekTransactionController,
  handleWebhookTransactionController,
} from "./transactionController";

const route = Router();

route.post("/", createTransactionController);
route.get("/:id", getTransactionByIdController);
route.get(
  "/transactionDetails/:transactionId",
  getTransactionDetailsByTransactionIdController
);
route.get("/", getTransactionController);
route.get("/now/today", getTodayTransactionController);
route.get("/now/week", getWeekTransactionController);
route.get("/now/month/:month", getMonthTransactionController);
route.get("/history/:transactionId", getHistoryByTransactionIdController);
route.put("/paid/:transactionId", UpdateToPaidTransactionController);
route.put("/status/:transactionId", customUpdateStatusTransactionController);
route.put('/cancel', cancelTransactioController)
route.put("/payment/:transactionId", UpdatePaymentTransactionController);
route.post("/payment", handleWebhookTransactionController);
// route.post("/print", printTransactionController)
// route.post("/print", printReceiptController)
route.post("/testing", (req, res) => {
  console.log(req.body);
  return res.json({ message: "Hello World" });
});

export default route;
