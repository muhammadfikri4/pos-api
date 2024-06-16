import { Router, type Request, type Response } from "express";
import authRoute from '../app/authentication/authRoute';
import categoryRoute from '../app/category/categoryRoute';

const route = Router();

route.use("/auth", authRoute);
route.use("/category", categoryRoute)

route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

export default route