import { Router } from "express";
import { createCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "./categoryController";

const route = Router()

route.post("/", createCategoryController)
route.get("/", getCategoryController)
route.put("/:id", updateCategoryController)
route.delete("/:id", deleteCategoryController)

export default route