import Knex, { QueryBuilder } from "knex";
import MdConfigs from "../../../../modules/shared/models/mdConfigs";

const { TABLE_NAME, col } = MdConfigs;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("pId", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.string(col("cKey", false));
      table.string(col("cValue", false));
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
