import knex from "knex";
import { AppEnv } from "../loaders/cfgBaseLoader";

export default knex(AppEnv.knex);
