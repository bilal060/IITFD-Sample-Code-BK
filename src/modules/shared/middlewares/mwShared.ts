import { NextFunction, Request, Response } from "express";

export const mwVerifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!(req.session && req.session.user)) {
      res.status(401).sendMsg("User not authenticated. Please Sign in First.");
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};