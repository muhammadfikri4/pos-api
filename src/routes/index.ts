import authRoute from '@app/authentication/authRoute';
import { Router, type Request, type Response } from "express";

const route = Router();

route.use("/auth", authRoute);
route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

export default route