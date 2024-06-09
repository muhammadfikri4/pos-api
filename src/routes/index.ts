import authRoute from '@app/authentication/authRoute';
import { Router } from "express";

const route = Router();

route.use("/auth", authRoute);

export default route