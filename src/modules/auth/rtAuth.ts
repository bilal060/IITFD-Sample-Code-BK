import express from "express";
import { ctSignUp, ctVerifyEmail, ctLogin } from "./ctAuth";
import utVerifyCaptcha from "../shared/util/utCaptcha";

const authRouter = express.Router();

authRouter.post("/signup", utVerifyCaptcha, ctSignUp);

authRouter.post("/verifyEmail", ctVerifyEmail);
authRouter.post("/login", utVerifyCaptcha, ctLogin);

export default authRouter;
