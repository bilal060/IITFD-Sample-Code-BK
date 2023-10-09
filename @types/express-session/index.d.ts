// eslint-disable-next-line import/no-unresolved
import { tpSessionUser } from "../../src/modules/shared/types/tpShared";

export declare module "express-session" {
  export interface SessionData {
    user: tpSessionUser;
  }
}
