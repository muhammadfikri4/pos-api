import { Router } from "express";
import { upload } from "./productConfig";
import { createProductController, deleteProductController, getProductController, updateProductController } from "./productController";

const route = Router()

route.post("/", upload.single("image"), createProductController)
route.get("/", getProductController)
route.put("/:id", updateProductController)
route.delete("/:id", deleteProductController)

export default route