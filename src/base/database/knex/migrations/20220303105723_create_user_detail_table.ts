import * as Knex from "knex";
import { QueryBuilder } from "knex";
import MdUserDetail from "../../../../modules/shared/models/mdUserDetail";
import MdEntity from "../../../../modules/entity/mdEntity";

const { TABLE_NAME, col } = MdUserDetail;
export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid("udId")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.string(col("udFirstname", false)).notNullable();
      table.string(col("udLastname", false)).nullable();
      table.string(col("udGender", false)).nullable();
      table.date(col("udDateOfBirth", false)).nullable();
      table.uuid(col("udEntityId", false)).references(MdEntity.col("eEuid", false)).inTable(MdEntity.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
