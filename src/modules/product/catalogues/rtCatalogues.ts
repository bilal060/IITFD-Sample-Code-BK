import express from "express";
import {
  ctGetList, ctUpdate, ctDelete, ctInsert,
} from "./ctCatalogues";
import { mwVerifySeller } from "./mwCatalogues";

const cataloguesRouter = express.Router();

cataloguesRouter.get("/", mwVerifySeller, ctGetList);
cataloguesRouter.put("/", mwVerifySeller, ctUpdate);
cataloguesRouter.post("/:id", mwVerifySeller, ctDelete);
cataloguesRouter.post("/", mwVerifySeller, ctInsert);

export default cataloguesRouter;
