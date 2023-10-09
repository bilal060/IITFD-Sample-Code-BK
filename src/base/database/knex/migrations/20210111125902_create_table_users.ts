import * as Knex from "knex";
import { QueryBuilder } from "knex";
import MdUser from "../../../../modules/auth/user/mdUser";

const { TABLE_NAME, col } = MdUser;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid("id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.string(col("username", false)).unique();
      table.string(col("password", false)).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
