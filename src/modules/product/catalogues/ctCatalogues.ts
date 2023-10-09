import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../../base/database/cfgKnex";
import { UPDATED_SUCCESS, DELETED_SUCCESS, INSERTED_SUCCESS } from "../../shared/constants/dtConstants";
import {
  srGetList, srUpdateEntity, srDeleteEntity, srInsertEntity,
} from "./srCatalogues";

export const ctGetList = async (
  req:Request,
  res:Response,
  next:NextFunction,
):Promise<void> => {
  try {
    await knex.transaction(async (trx:Transaction) => {
      const list = await srGetList(trx);
      res.sendList(list);
    });
  } catch (e) {
    next(e);
  }
};
export const ctUpdate = async (
  req:Request,
  res:Response,
  next:NextFunction,
):Promise<void> => {
  try {
    await knex.transaction(async (trx:Transaction) => {
      await srUpdateEntity(trx, req.body);
      res.sendMsg(UPDATED_SUCCESS);
    });
  } catch (e) {
    next(e);
  }
};
export const ctDelete = async (
  req:Request,
  res:Response,
  next:NextFunction,
):Promise<void> => {
  try {
    await knex.transaction(async (trx:Transaction) => {
      await srDeleteEntity(trx, req.params.id);
      res.sendMsg(DELETED_SUCCESS);
    });
  } catch (e) {
    next(e);
  }
};
export const ctInsert = async (
  req:Request,
  res:Response,
  next:NextFunction,
):Promise<void> => {
  try {
    await knex.transaction(async (trx:Transaction) => {
      const data = await srInsertEntity(trx, req.body, req.session.user?.id as string);
      res.json({ message: INSERTED_SUCCESS, data });
    });
  } catch (e) {
    next(e);
  }
};

export default { ctGetList };
