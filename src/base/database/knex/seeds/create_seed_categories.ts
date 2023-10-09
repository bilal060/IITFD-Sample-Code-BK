import * as Knex from "knex";
import MdCategories from "../../../../modules/product/categories/mdCategories";

export async function seed(knex: Knex): Promise<any> {
  await knex(MdCategories.TABLE_NAME).del();

  await knex(MdCategories.TABLE_NAME).insert([
    {
      cName: "Clothes",
    },
    {
      cName: "Books",
    },
    {
      cName: "Shoes",
    },
  ]);
}
