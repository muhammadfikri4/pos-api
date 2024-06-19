import { Router } from "express";
import { UpdateToPaidTransactionController, createTransactionController, getTransactionByIdController, getTransactionController, getTransactionDetailsByTransactionIdController } from "./transactionController";

const route = Router()

route.post("/", createTransactionController)
route.get("/:id", getTransactionByIdController)
route.get("/transactionDetails/:transactionId", getTransactionDetailsByTransactionIdController)
route.get("/", getTransactionController)
route.put("/paid/:transactionId", UpdateToPaidTransactionController)
// route.put("/:id", updateProductController)
// route.delete("/:id", deleteProductController)

export default route