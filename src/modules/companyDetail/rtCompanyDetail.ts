import express from "express";
import { ctGetListing, ctUpdateStatus } from "./ctCompanyDetail";

const companyDetailRouter = express.Router();

companyDetailRouter.get("/", ctGetListing);
companyDetailRouter.put("/status", ctUpdateStatus);

export default companyDetailRouter;
