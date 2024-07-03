import { Router } from "express";
import { UpdatePaymentTransactionController, UpdateToPaidTransactionController, createTransactionController, customUpdateStatusTransactionController, getHistoryByTransactionIdController, getTransactionByIdController, getTransactionController, getTransactionDetailsByTransactionIdController, handleWebhookTransactionController, printTransactionController } from "./transactionController";

const route = Router()

route.post("/", createTransactionController)
route.get("/:id", getTransactionByIdController)
route.get("/transactionDetails/:transactionId", getTransactionDetailsByTransactionIdController)
route.get("/", getTransactionController)
route.get("/history/:transactionId", getHistoryByTransactionIdController)
route.put("/paid/:transactionId", UpdateToPaidTransactionController)
route.put("/status/:transactionId", customUpdateStatusTransactionController)
route.put("/payment/:transactionId", UpdatePaymentTransactionController)
route.post("/payment", handleWebhookTransactionController)
route.post("/print", printTransactionController)
route.post('/testing', (req, res) => {
    console.log(req.body)
    return res.json({ message: "Hello World" })
})

export default route