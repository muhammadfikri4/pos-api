import { Router } from "express";
import { upload } from "./productConfig";
import { createProductController, deleteProductController, getProductByIdController, getProductController, updateProductController } from "./productController";

const route = Router()

route.post("/", upload.single("image"), createProductController)
route.get("/", getProductController)
route.get("/:id", getProductByIdController)
route.put("/:id", upload.single("image"), updateProductController)
route.delete("/:id", deleteProductController)

export default route