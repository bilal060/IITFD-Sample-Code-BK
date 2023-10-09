import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../base/database/cfgKnex";
import { srGetList, srUpdateEntityStatus } from "./srCompanyDetail";

export const ctGetListing = async (
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

export const ctUpdateStatus = async (
  req:Request,
  res:Response,
  next:NextFunction,
):Promise<void> => {
  try {
    await knex.transaction(async (trx:Transaction) => {
      await srUpdateEntityStatus(trx, req.body);
      res.sendMsg("Status Updated Successfully");
    });
  } catch (e) {
    next(e);
  }
};
