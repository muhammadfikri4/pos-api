import { Router } from "express";
import { UpdateToPaidTransactionController, createTransactionController, customUpdateStatusTransactionController, getHistoryByTransactionIdController, getTransactionByIdController, getTransactionController, getTransactionDetailsByTransactionIdController, handleWebhookTransactionController } from "./transactionController";

const route = Router()

route.post("/", createTransactionController)
route.get("/:id", getTransactionByIdController)
route.get("/transactionDetails/:transactionId", getTransactionDetailsByTransactionIdController)
route.get("/", getTransactionController)
route.get("/history/:transactionId", getHistoryByTransactionIdController)
route.put("/paid/:transactionId", UpdateToPaidTransactionController)
route.put("/status/:transactionId", customUpdateStatusTransactionController)
route.post("/payment", handleWebhookTransactionController)
route.post('/testing', (req, res) => {
    console.log(req.body)
    return res.json({ message: "Hello World" })
})

export default route