import { Router } from "express";
import { createTransactionController } from "./transactionController";

const route = Router()

route.post("/", createTransactionController)
// route.get("/", getProductController)
// route.put("/:id", updateProductController)
// route.delete("/:id", deleteProductController)

export default route