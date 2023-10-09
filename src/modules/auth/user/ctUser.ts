import { Request, Response, NextFunction } from "express";
import knex from "../../../base/database/cfgKnex";
import MdMessage from "../../../base/error/mdMessage";
import DoUser from "./doUser";

class CtUser {
  public static async getAllUsers(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await knex.transaction(async (trx) => res.json(await DoUser.getAll(trx, ["id", "username"])));
    } catch (e) {
      next(e);
    }
  }

  public static async addUser(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.json(new MdMessage("The user has been added!"));
    } catch (e) {
      next(e);
    }
  }
}

export default CtUser;
