import { Transaction } from "knex";
import DoProductCatalog from "./doProductCatalog";
import { tpCatalogues, tpProductCatalog, tpProducts } from "../../shared/types/tpShared";
import doProducts from "../products/doProducts";
import doCatalogues from "../catalogues/doCatalogues";

export const srGetList = async (trx: Transaction): Promise<tpProductCatalog[]> => {
  const list = await DoProductCatalog.getAll(trx, "*")
    .innerJoin("catalogues", "product_catalog.pcCatalogId", "catalogues.ctUuid")
    .innerJoin("products", "product_catalog.pcProductId", "products.pUuid")
    .returning("*");
  return list as tpProductCatalog[];
};

export const srGetProductsList = async (trx: Transaction): Promise<tpProducts[]> => {
  const list = await doProducts.getAll(trx, ["pUuid", "pName", "pPrice"]);
  return list as tpProducts[];
};

export const srGetCataloguesList = async (trx: Transaction): Promise<tpCatalogues[]> => {
  const list = await doCatalogues.getAll(trx, ["ctUuid", "cName"]);
  return list as tpCatalogues[];
};

export const srUpdateEntity = async (trx: Transaction, data: tpProductCatalog): Promise<void> => {
  const { pcUuid } = data;
  await DoProductCatalog.updateOneByColName(trx, data, "pcUuid", pcUuid);
};

export const srDeleteEntity = async (trx: Transaction, id: string): Promise<void> => {
  await DoProductCatalog.deleteOneByCol(trx, "pcUuid", id);
};
export const srInsertEntity = async (trx: Transaction, data: tpProductCatalog): Promise<tpProductCatalog> => {
  const res = await DoProductCatalog.insertOne(trx, data)
    .returning("*");
  return res[0] as unknown as tpProductCatalog;
};

export const srGetOneProduct = async (trx: Transaction, id: string): Promise<tpProductCatalog> => {
  const list = await DoProductCatalog.findOneByCol(trx, "pcUuid", id)
    .innerJoin("catalogues", "product_catalog.pcCatalogId", "catalogues.ctUuid")
    .innerJoin("products", "product_catalog.pcProductId", "products.pUuid")
    .returning("*");
  return list as unknown as tpProductCatalog;
};
