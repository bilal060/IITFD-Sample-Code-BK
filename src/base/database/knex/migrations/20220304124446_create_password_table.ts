import Knex, { QueryBuilder } from "knex";
import MdPassword from "../../../../modules/shared/models/mdPassword";
import MdEntity from "../../../../modules/entity/mdEntity";

const { TABLE_NAME, col } = MdPassword;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("pId", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.uuid(col("pEntityId", false)).references(MdEntity.col("eEuid", false)).inTable(MdEntity.TABLE_NAME);
      table.string(col("pPassword", false));
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
