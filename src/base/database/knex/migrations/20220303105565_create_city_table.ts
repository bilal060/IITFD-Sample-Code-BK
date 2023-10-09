import * as Knex from "knex";
import { QueryBuilder } from "knex";
import MdCity from "../../../../modules/city/mdCity";
import MdCountry from "../../../../modules/country/mdCountry";

const { TABLE_NAME, col } = MdCity;
export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid("cId")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.string(col("cName", false)).notNullable();
      table.uuid(col("cCountryId", false)).references(MdCountry.col("cId", false)).inTable(MdCountry.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
