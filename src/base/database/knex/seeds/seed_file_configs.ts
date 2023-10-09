import * as Knex from "knex";
import { EXPIRED_EMAIL_CONFIG } from "../../../../modules/shared/constants/dtConstants";
import DoConfigs from "../../../../modules/shared/configs/DoConfigs";

export async function seed(knex: Knex): Promise<any> {
  return knex.transaction(async (trx) => {
    await DoConfigs.insertOne(trx, {
      cKey: EXPIRED_EMAIL_CONFIG,
      cValue: "2",
    });
  });
}
