import { UserModel } from "@model/user";
import { Router } from "express";
import { loginController } from "./authController";

const route = Router()

route.post("/register", async (req, res) => {
    const { email, password, name } = req.body
    const data = await UserModel.create({ email, password, name })
    res.json({ message: 'success', data })
})

route.get("/login", loginController)

export default route