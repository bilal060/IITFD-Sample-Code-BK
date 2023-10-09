import express from "express";
import { mwVerifyUser } from "../../../modules/shared/middlewares/mwShared";
import {
  ctGetList, ctGetCategoriesList, ctUpdate, ctDelete, ctInsert, ctGetSellerList,
} from "./ctProducts";
import { mwVerifySeller } from "./mwProducts";

const productsRouter = express.Router();

productsRouter.get("/", mwVerifySeller, ctGetList);
productsRouter.get("/categories", mwVerifySeller, ctGetCategoriesList);
productsRouter.put("/", mwVerifySeller, ctUpdate);
productsRouter.post("/:id", mwVerifySeller, ctDelete);
productsRouter.post("/", mwVerifySeller, ctInsert);
productsRouter.get("/product/sellers", mwVerifyUser, ctGetSellerList);

export default productsRouter;
