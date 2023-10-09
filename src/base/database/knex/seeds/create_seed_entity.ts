import * as Knex from "knex";
import MdEntity from "../../../../modules/entity/mdEntity";

export async function seed(knex: Knex): Promise<any> {
  await knex(MdEntity.TABLE_NAME).del();

  await knex(MdEntity.TABLE_NAME).insert([
    {
      ePriType: "Buyer and Seller",
      eStatus: "Approved",
    },
    {
      ePriType: "buyer",
      eStatus: "Approved",
    },
    {
      ePriType: "seller",
      eStatus: "Approved",
    },
  ]);
}
