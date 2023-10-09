import * as Knex from "knex";
import { QueryBuilder } from "knex";
import MdCompanyDetail from "../../../../modules/companyDetail/mdCompanyDetail";
import MdEntity from "../../../../modules/entity/mdEntity";

const { TABLE_NAME, col } = MdCompanyDetail;
export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid("cdId")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.string(col("cdName", false)).notNullable();
      table.uuid(col("cdEntityId", false)).references(MdEntity.col("eEuid", false)).inTable(MdEntity.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
