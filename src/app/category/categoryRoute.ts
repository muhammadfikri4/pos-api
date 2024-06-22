import { Router } from "express";
import { createCategoryController, deleteCategoryController, getCategoryByIdController, getCategoryController, updateCategoryController } from "./categoryController";

const route = Router()

route.post("/", createCategoryController)
route.get("/", getCategoryController)
route.get("/:id", getCategoryByIdController)
route.put("/:id", updateCategoryController)
route.delete("/:id", deleteCategoryController)

export default route