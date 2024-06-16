import { Router } from "express";
import { createProductController, deleteProductController, getProductController, updateProductController } from "./productController";

const route = Router()

route.post("/", createProductController)
route.get("/", getProductController)
route.put("/:id", updateProductController)
route.delete("/:id", deleteProductController)

export default route