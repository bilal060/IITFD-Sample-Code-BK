import {
  Request, Response, Errback, NextFunction,
} from "express";
import MdBaseError from "./base/error/mdBaseError";
import MdMessage from "./base/error/mdMessage";
import preAppLoader from "./base/loaders/apPreLoader";
import appRouter from "./modules/rtApp";

const expressInstance = preAppLoader({
  databaseEnabled: false,
  sessionEnabled: true,
});

expressInstance.use((_req, res, next) => {
  res.sendList = (data: unknown, message?: string) => {
    res.json({
      data,
      message,
    });
  };
  res.sendObject = (data: unknown, message?: string) => {
    res.json({
      data,
      message,
    });
  };
  res.sendMsg = (message: string) => {
    res.json({ message });
  };
  res.sendString = (str: string) => res.send(str);
  next();
});

expressInstance.use("/api", appRouter);

expressInstance.use(
  (err: Errback, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err);
    if ("getErrorCode" in err) {
      const e = err as unknown as MdBaseError;
      res.status(e.getErrorCode()).json(new MdMessage(e.getErrorMessage()));
    } else {
      res.status(422).json({
        message: "There is an error occurred, Sorry for inconvenience",
      });
    }
  },
);

export default expressInstance;
