import { Transaction } from "knex";
import DoCatalogues from "./doCatalogues";
import { tpCatalogues } from "../../shared/types/tpShared";

export const srGetList = async (trx: Transaction): Promise<tpCatalogues[]> => {
  const list = await DoCatalogues.getAll(trx, "*");
  return list as tpCatalogues[];
};

export const srUpdateEntity = async (trx: Transaction, data: tpCatalogues): Promise<void> => {
  const { ctUuid } = data;
  await DoCatalogues.updateOneByColName(trx, data, "ctUuid", ctUuid);
};

export const srDeleteEntity = async (trx: Transaction, id: string): Promise<void> => {
  await DoCatalogues.deleteOneByCol(trx, "ctUuid", id);
};
export const srInsertEntity = async (trx: Transaction, data: tpCatalogues, userId: string): Promise<tpCatalogues[]> => {
  const insertData = data;
  insertData.entityId = userId;
  const res = await DoCatalogues.insertOne(trx, insertData).returning("*");
  return res[0];
};