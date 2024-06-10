import { Router } from "express";
import { createThreadController, getThreadController } from "./threadController";

const route = Router()

route.post("", createThreadController)
route.get("", getThreadController)

export default route