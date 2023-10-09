import { NextFunction, Request, Response } from "express";

export const mwVerifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!(req.session
            && req.session.user
            && req.session?.user?.type === "admin")) {
      res.status(401).sendMsg("User not authenticated");
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};

export default { mwVerifyAdmin };
