import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import { UPDATED_SUCCESS, DELETED_SUCCESS, INSERTED_SUCCESS } from "../../shared/constants/dtConstants";
import knex from "../../../base/database/cfgKnex";
import {
  srGetList, srUpdateEntity, srDeleteEntity, srInsertEntity, srGetOneProduct, srGetProductsList, srGetCataloguesList,
} from "./srProductCatalog";

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

export const ctGetProductsList = async (
  req:Request,
  res:Response,
  next:NextFunction,
):Promise<void> => {
  try {
    await knex.transaction(async (trx:Transaction) => {
      const list = await srGetProductsList(trx);
      res.sendList(list);
    });
  } catch (e) {
    next(e);
  }
};

export const ctGetCataloguesList = async (
  req:Request,
  res:Response,
  next:NextFunction,
):Promise<void> => {
  try {
    await knex.transaction(async (trx:Transaction) => {
      const list = await srGetCataloguesList(trx);
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
      const data = await srInsertEntity(trx, req.body);
      const inerted = await srGetOneProduct(trx, data.pcUuid);
      res.json({ message: INSERTED_SUCCESS, data: inerted });
    });
  } catch (e) {
    next(e);
  }
};

export default { ctGetList };
