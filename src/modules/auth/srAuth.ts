import { Request } from "express";
import { Transaction } from "knex";
import moment from "moment";
import {
  EXPIRED_EMAIL_CONFIG, CONFIG_KEY,
  FAILED_ADD_USER, FAILED_VERIFY_EMAIL,
  FAILED_VERIFY_EMAIL_ALREADY_VERIFIED, FAILED_VERIFY_EMAIL_TOKEN_EXPIRED, USER_ALREADY_EXISTS, INVALID_ENTRY,
} from "../shared/constants/dtConstants";
import MdEntity from "../entity/mdEntity";
import {
  tpRegisterRequest, tpVerifyEmailRequest, tpUser, tpLoginUser,
} from "../shared/types/tpShared";
import DoEmail from "./email/DoEmail";
import DoPassword from "./password/DoPassword";
import DoEntity from "../entity/doEntity";
import ForbiddenErrorModel from "../../base/error/mdForbiddenError";
import UnprocessableEntityErrorModel from "../../base/error/mdUnprocessableEntityError";
import { srBcryptHash } from "../shared/service/srBcrypt";
import DoEmailVerifications from "./emailVerifications/DoEmailVerifications";
import DoCompanyDetail from "../companyDetail/doCompanyDetail";
import MdEmailVerification from "../shared/models/mdEmailVerification";
import DoConfigs from "../shared/configs/DoConfigs";
import CfgApp from "../shared/configs/cfgApp";
import srBcryptCompare from "../../base/service/srBcrypt";

const srAddUserRecord = async (trx: Transaction, user: tpRegisterRequest) => {
  const {
    email, password, workAs, companyName,
  } = user;
  const [entity] = await DoEntity.insertOne(trx, { eStatus: "pending", ePriType: workAs });
  await DoEmail.insertOne(trx, { eEmail: email, eEntityId: entity.eEuid, eType: "primary" });
  await DoCompanyDetail.insertOne(trx, { cdName: companyName, cdEntityId: entity.eEuid });
  await DoPassword.insertOne(trx, { pPassword: await srBcryptHash(password), pEntityId: entity.eEuid });
  const emailModel = await DoEmail.findOneByCol(trx, "eEmail", email);
  const [emailVerifications] = await DoEmailVerifications.insertOne(trx, {
    evEntityId: entity.eEuid,
    evEmailId: emailModel.eId,
    evStatus: "pending",
  });
  return entity;
};

export const srAddUser = async (trx: Transaction, user: tpRegisterRequest): Promise<MdEntity> => {
  const { email } = user;
  const existingEmailRow = await DoEmail.findOneByCol(trx, "eEmail", email);
  if (existingEmailRow && existingEmailRow.eEntityId
    && await DoPassword.findOneByCol(trx, "pEntityId", existingEmailRow.eEntityId)) {
    throw new ForbiddenErrorModel(USER_ALREADY_EXISTS);
  }
  if (!existingEmailRow) {
    const entity = await srAddUserRecord(trx, user);
    return entity;
  }
  throw new UnprocessableEntityErrorModel(FAILED_ADD_USER);
};

const srCheckEmailAlreadyVerified = (emailVerification: MdEmailVerification) => {
  if (emailVerification.evStatus === "verified") {
    throw new ForbiddenErrorModel(FAILED_VERIFY_EMAIL_ALREADY_VERIFIED);
  }
};

const srVerifyEmail = async (trx: Transaction, emailVerification: MdEmailVerification)
  : Promise<MdEmailVerification | undefined> => {
  const configs = await DoConfigs.findOneByCol(trx, CONFIG_KEY, EXPIRED_EMAIL_CONFIG);
  const cEmailExpiryInDays = configs.cValue ?? CfgApp.emailExpiryInDays;
  if (emailVerification && emailVerification.evId && emailVerification.evCreationDateTime) {
    const currentDate = moment();
    const VerificationDate = moment(emailVerification.evCreationDateTime).add(cEmailExpiryInDays, "days");
    if (currentDate.isAfter(VerificationDate)) {
      throw new ForbiddenErrorModel(FAILED_VERIFY_EMAIL_TOKEN_EXPIRED);
    } else {
      const [emailVerificationModel] = await DoEmailVerifications.updateOneByColName(trx,
        { evStatus: "verified" }, "evId", emailVerification.evId);
      return emailVerificationModel;
    }
  }
  throw new ForbiddenErrorModel(FAILED_VERIFY_EMAIL);
};

export const srVerificationEmail = async (trx: Transaction, body: tpVerifyEmailRequest): Promise<MdEmailVerification> => {
  const emailVerification = await DoEmailVerifications.findOneByCol(trx, "evId", body.emailToken);
  srCheckEmailAlreadyVerified(emailVerification);
  const emailVerificationModel = await srVerifyEmail(trx, emailVerification);
  if (emailVerificationModel) {
    return emailVerificationModel;
  }
  throw new UnprocessableEntityErrorModel(FAILED_VERIFY_EMAIL);
};

export const srCheckUser = async (trx: Transaction, payload: tpLoginUser): Promise<MdEntity> => {
  const userModel = await DoEmail.findOneByCol(trx, "eEmail", payload.email);
  if (!userModel) {
    return {} as MdEntity;
  }
  const pUserPass = await DoPassword.findOneByCol(trx, "pEntityId", userModel.eEntityId as string);
  const entityModal = await DoEntity.findOneByCol(trx, "eEuid", pUserPass.pEntityId as string);
  if (userModel && await srBcryptCompare.bcryptCompare(payload.password, pUserPass.pPassword as string)) {
    return entityModal;
  }
  return {} as MdEntity;
};

export const srLogin = async (
  trx: Transaction,
  req: Request,
  payload: tpLoginUser,
): Promise<tpUser> => {
  let auth = false;
  const entityModal = await srCheckUser(trx, payload);
  if ((entityModal.eEuid) && (entityModal.ePriType === "admin"
    || entityModal.ePriType === "seller" || entityModal.ePriType === "buyer"
    || entityModal.ePriType === "Buyer and Seller")) {
    auth = true;
  } else {
    return {} as tpUser;
  }
  if (auth) {
    if (entityModal.eStatus === "Approved") {
      return {
        id: entityModal.eEuid as string, email: payload.email, type: entityModal.ePriType as string, redirect: "/dashboard",
      };
    }

    return {
      id: entityModal.eEuid as string, email: payload.email, type: entityModal.ePriType as string, redirect: "/company",
    };
  }
  throw new Error(INVALID_ENTRY);
};
