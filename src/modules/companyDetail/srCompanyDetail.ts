import { Transaction } from "knex";
import DoCompanyDetail from "./doCompanyDetail";
import DoEntity from "../entity/doEntity";
import { tpUserStatus, tpCompanyList } from "../shared/types/tpShared";

export const srGetList = async (trx:Transaction):Promise<tpCompanyList[]> => {
  const modalData = await DoCompanyDetail.getCompanyDetail(trx);
  return modalData;
};

export const srUpdateEntityStatus = async (trx:Transaction, data:tpUserStatus):Promise<void> => {
  const { id, status } = data;
  await DoEntity.updateOneByColName(trx, { eStatus: status }, "eEuid", id);
};
