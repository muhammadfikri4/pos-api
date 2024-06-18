import { Router } from "express";
import { createTransactionController, getTransactionController, getTransactionDetailsByTransactionIdController } from "./transactionController";

const route = Router()

route.post("/", createTransactionController)
route.get("/:transactionId", getTransactionDetailsByTransactionIdController)
route.get("/", getTransactionController)
// route.put("/:id", updateProductController)
// route.delete("/:id", deleteProductController)

export default route