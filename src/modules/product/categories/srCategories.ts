import { Transaction } from "knex";
import DoCategories from "./doCategories";
import { tpCategories } from "../../shared/types/tpShared";

export const srGetList = async (trx: Transaction): Promise<tpCategories[]> => {
  const list = await DoCategories.getAll(trx, "*");
  return list as tpCategories[];
};
export const srUpdateEntity = async (trx: Transaction, data: tpCategories): Promise<void> => {
  const { cUuid } = data;
  await DoCategories.updateOneByColName(trx, data, "cUuid", cUuid);
};

export const srDeleteEntity = async (trx: Transaction, id: string): Promise<void> => {
  await DoCategories.deleteOneByCol(trx, "cUuid", id);
};
export const srInsertEntity = async (trx: Transaction, data: tpCategories): Promise<tpCategories[]> => {
  const res = await DoCategories.insertOne(trx, data).returning("*");
  return res[0];
};
