import { Router } from "express";
import { getIncomeController } from "./incomeController";

const route = Router()

route.get("/", getIncomeController)

export default route