import express from "express";
import MdMessage from "../base/error/mdMessage";
import authRouter from "./auth/rtAuth";
import CtUser from "./auth/user/ctUser";
import companyDetailRouter from "./companyDetail/rtCompanyDetail";
import categoriesRouter from "./product/categories/rtCategories";
import cataloguesRouter from "./product/catalogues/rtCatalogues";
import productsRouter from "./product/products/rtProducts";
import productCatalogRouter from "./product/productCatalog/rtProductCatalog";

const appRouter = express.Router();

appRouter.get("/users", CtUser.getAllUsers);
appRouter.post("/users", CtUser.addUser);

appRouter.use("/auth", authRouter);

appRouter.get("/test", (_req, res) => res.json(new MdMessage("App is working!!!")));
appRouter.use("/user-listings", companyDetailRouter);
appRouter.use("/categories", categoriesRouter);
appRouter.use("/catalogues", cataloguesRouter);
appRouter.use("/products", productsRouter);
appRouter.use("/product_catalog", productCatalogRouter);

export default appRouter;
