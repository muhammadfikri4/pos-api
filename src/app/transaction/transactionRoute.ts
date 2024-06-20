import { Router } from "express";
import { UpdateToPaidTransactionController, createTransactionController, customUpdateStatusTransactionController, getHistoryByTransactionIdController, getTransactionByIdController, getTransactionController, getTransactionDetailsByTransactionIdController } from "./transactionController";

const route = Router()

route.post("/", createTransactionController)
route.get("/:id", getTransactionByIdController)
route.get("/transactionDetails/:transactionId", getTransactionDetailsByTransactionIdController)
route.get("/", getTransactionController)
route.get("/history/:transactionId", getHistoryByTransactionIdController)
route.put("/paid/:transactionId", UpdateToPaidTransactionController)
route.put("/status/:transactionId", customUpdateStatusTransactionController)
// route.put("/:id", updateProductController)
// route.delete("/:id", deleteProductController)

export default route