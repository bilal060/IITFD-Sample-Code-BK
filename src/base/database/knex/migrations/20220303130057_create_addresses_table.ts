import * as Knex from "knex";
import { QueryBuilder } from "knex";
import MdAddresses from "../../../../modules/address/mdAddress";
import MdEntity from "../../../../modules/entity/mdEntity";
import MdCountry from "../../../../modules/country/mdCountry";
import MdCity from "../../../../modules/city/mdCity";

const { TABLE_NAME, col } = MdAddresses;
export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid("aId")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.string(col("aAddressLine1", false)).notNullable();
      table.string(col("aAddressLine2", false)).nullable();
      table.integer(col("aZip", false)).nullable();
      table.uuid(col("aEntityId", false)).references(MdEntity.col("eEuid", false)).inTable(MdEntity.TABLE_NAME);
      table.uuid(col("aCountryId", false)).references(MdCountry.col("cId", false)).inTable(MdCountry.TABLE_NAME);
      table.uuid(col("aCityId", false)).references(MdCity.col("cId", false)).inTable(MdCity.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
