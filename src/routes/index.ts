import { Router, type Request, type Response } from "express";
import authRoute from '../app/authentication/authRoute';
import threadRoute from '../app/thread/threadRoute';

const route = Router();

route.use("/auth", authRoute);
route.use("/thread", threadRoute)


route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

export default route