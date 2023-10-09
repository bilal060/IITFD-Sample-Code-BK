import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";
import { FAILED_RECAPTCHA_VERIFICATION } from "../constants/dtConstants";

const captchaVerificationGoogleUrl = "https://www.google.com/recaptcha/api/siteverify";
const captchaSecretKey = "6LcyT7YeAAAAANADjH6QS2zZVrSYR6yG4jRhYEHv";
const utVerifyCaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { reCaptchaToken } = req.body;
    let isHuman = false;
    const response = await fetch(
      `${captchaVerificationGoogleUrl}?secret=${captchaSecretKey}&response=${reCaptchaToken}`,
      {
        method: "POST",
      },
    );
    const data = await response.json();
    isHuman = data.success;
    if (reCaptchaToken === null || !isHuman) {
      throw new Error(FAILED_RECAPTCHA_VERIFICATION);
    }
    next();
  } catch (error) {
    res.status(UNPROCESSABLE_ENTITY)
      .json({ message: FAILED_RECAPTCHA_VERIFICATION });
  }
};
export default utVerifyCaptcha;
