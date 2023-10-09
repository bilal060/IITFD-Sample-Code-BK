import { Transaction } from "knex";
import DoProducts from "./doProducts";
import doCategories from "../categories/doCategories";
import { tpProducts, tpCategories } from "../../shared/types/tpShared";
import SrFiles from "../../files/srFiles";

export const srGetList = async (trx: Transaction): Promise<tpProducts[]> => {
  const list = await DoProducts.getAll(trx, "*")
    .innerJoin("categories", "products.pCategoryId", "categories.cUuid")
    .returning("*");
  return list as tpProducts[];
};

export const srGetCategoriesList = async (trx: Transaction): Promise<tpCategories[]> => {
  const list = await doCategories.getAll(trx, ["cUuid", "cName"]);
  return list as tpCategories[];
};

export const srUpdateEntity = async (trx: Transaction, data: tpProducts): Promise<void> => {
  const { pUuid } = data;
  await DoProducts.updateOneByColName(trx, data, "pUuid", pUuid);
};

export const srDeleteEntity = async (trx: Transaction, id: string): Promise<void> => {
  await DoProducts.deleteOneByCol(trx, "pUuid", id);
};
export const srInsertEntity = async (trx: Transaction, data: tpProducts): Promise<tpProducts> => {
  const res = await DoProducts.insertOne(trx, data).returning("*");
  for (const img of data.pImages) {
    await SrFiles.addFile(trx, data.pUuid, img);
  }
  return res[0] as unknown as tpProducts;
};

export const srGetOneProduct = async (trx: Transaction, id: string): Promise<tpProducts> => {
  const list = await DoProducts.findOneByCol(trx, "pUuid", id)
    .innerJoin("categories", "products.pCategoryId", "categories.cUuid")
    .returning("*");
  return list as unknown as tpProducts;
};

export const srGetSellerList = async (trx: Transaction): Promise<void> => {

};

