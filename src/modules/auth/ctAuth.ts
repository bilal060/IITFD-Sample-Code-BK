import { NextFunction, Request, Response } from "express";
import { Transaction } from "knex";
import knex from "../../base/database/cfgKnex";
import { srAddUser, srVerificationEmail, srLogin } from "./srAuth";
import {
  LOGIN_INVALID, LOGIN_SUCCESS, USER_ADDED_SUCCESS, VERIFY_EMAIL_SUCCESS,
} from "../shared/constants/dtConstants";

export const ctLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await knex.transaction(async (trx) => {
      const userModel = await srLogin(trx, req, req.body);
      if (userModel && userModel.id) {
        req.session.user = { id: userModel.id, email: userModel.email, type: userModel.type };
        res.json({ message: LOGIN_SUCCESS, data: userModel });
      } else {
        res.status(403).sendMsg(LOGIN_INVALID);
      }
    });
  } catch (e) {
    next(e);
  }
};

export const ctSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await knex.transaction(async (trx: Transaction) => {
      await srAddUser(trx, req.body);
      res.sendMsg(USER_ADDED_SUCCESS);
    });
  } catch (e) {
    next(e);
  }
};

export const ctVerifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await knex.transaction(async (trx: Transaction) => {
      await srVerificationEmail(trx, req.body);
      res.sendMsg(VERIFY_EMAIL_SUCCESS);
    });
  } catch (e) {
    next(e);
  }
};
