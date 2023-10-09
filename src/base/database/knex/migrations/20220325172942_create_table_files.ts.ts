import * as Knex from "knex";
import MdEntity from "../../../../modules/entity/mdEntity";
import MdFiles from "../../../../modules/files/mdFiles";
import { ExtensionTypeList, TypeList } from "../../../../modules/shared/types/tpShared";

const { TABLE_NAME, col } = MdFiles;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid(col("id", false))
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.string(col("fPath", false));
      table.string(col("fName", false));
      table
        .uuid(col("fEntityId", false))
        .references(MdEntity.col("eEuid", false))
        .inTable(MdEntity.TABLE_NAME);
      table.enu(col("fExtension", false), ExtensionTypeList);
      table.enu(col("fType", false), TypeList);
      table.string(col("fId", false));
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
