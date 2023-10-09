import express from "express";
import {
  ctGetList, ctUpdate, ctDelete, ctInsert,
} from "./ctCategories";
import { mwVerifyAdmin } from "./mwCategories";

const categoriesRouter = express.Router();

categoriesRouter.get("/", mwVerifyAdmin, ctGetList);
categoriesRouter.put("/", mwVerifyAdmin, ctUpdate);
categoriesRouter.post("/:id", mwVerifyAdmin, ctDelete);
categoriesRouter.post("/", mwVerifyAdmin, ctInsert);

export default categoriesRouter;
