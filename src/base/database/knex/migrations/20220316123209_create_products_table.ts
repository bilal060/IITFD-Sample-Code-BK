import Knex, { QueryBuilder } from "knex";
import mdProducts from "../../../../modules/product/products/mdProducts";
import MdCategories from "../../../../modules/product/categories/mdCategories";
import MdUser from "../../../../modules/auth/user/mdUser";

const { TABLE_NAME, col } = mdProducts;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid(col("pUuid", false))
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table
        .uuid(col("pCategoryId", false))
        .references(MdCategories.col("cUuid", false))
        .inTable(MdCategories.TABLE_NAME);
      table.string(col("pName", false));
      table.string(col("pPrice", false));
      table.string(col("pDescription", false));
      table
        .uuid(col("pUserId", false))
        .references(MdUser.col("id", false))
        .inTable(MdUser.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
