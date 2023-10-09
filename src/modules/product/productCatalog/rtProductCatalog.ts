import express from "express";
import {
  ctGetList, ctUpdate, ctDelete, ctInsert, ctGetProductsList, ctGetCataloguesList,
} from "./ctProductCatalog";

const productCatalogRouter = express.Router();

productCatalogRouter.get("/", ctGetList);
productCatalogRouter.get("/products", ctGetProductsList);
productCatalogRouter.get("/catalogues", ctGetCataloguesList);
productCatalogRouter.put("/", ctUpdate);
productCatalogRouter.post("/:id", ctDelete);
productCatalogRouter.post("/", ctInsert);

export default productCatalogRouter;
