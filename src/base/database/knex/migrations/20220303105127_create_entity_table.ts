import * as Knex from "knex";
import { QueryBuilder } from "knex";
import MdEntity from "../../../../modules/entity/mdEntity";

const { TABLE_NAME, col } = MdEntity;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid("eEuid")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.string(col("ePriType", false)).notNullable();
      table.string(col("eStatus", false)).notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
