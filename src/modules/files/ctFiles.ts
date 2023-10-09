import { NextFunction, Request, Response } from "express";
import knex from "../../base/database/cfgKnex";
import SrFiles from "./srFiles";
import MdUnprocessableEntityError from "../../base/error/mdUnprocessableEntityError";
import { ERR_INVALID_DATA_PROVIDED } from "../shared/constants/dtConstants";

class CtFile {
  static async addFile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { entityId } = req.params;
      const file = req.file as Express.Multer.File;
      if (entityId && file) {
        await knex.transaction(async (trx) => {
          const fileModel = await SrFiles.addFile(trx, entityId, file);
          res.sendObject(fileModel);
        });
      } else {
        throw new MdUnprocessableEntityError(ERR_INVALID_DATA_PROVIDED);
      }
    } catch (e) {
      next(e);
    }
  }

  static async updateFile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { fileId } = req.params;
      const file = req.file as Express.Multer.File | string;
      if (fileId && file && typeof file !== "string") {
        await knex.transaction(async (trx) => {
          const fileModel = await SrFiles.updateFile(trx, fileId, file);
          res.sendObject(fileModel);
        });
      } else {
        throw new MdUnprocessableEntityError(ERR_INVALID_DATA_PROVIDED);
      }
    } catch (e) {
      next(e);
    }
  }
}

export default CtFile;
