import * as Knex from "knex";
import { QueryBuilder } from "knex";
import MdEmailVerification from "../../../../modules/shared/models/mdEmailVerification";
import MdEntity from "../../../../modules/entity/mdEntity";
import MdEmail from "../../../../modules/shared/models/mdEmail";

const { TABLE_NAME, col } = MdEmailVerification;
export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table
        .uuid("evId")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .notNullable();
      table.uuid(col("evEntityId", false)).references(MdEntity.col("eEuid", false)).inTable(MdEntity.TABLE_NAME);
      table.uuid(col("evEmailId", false)).references(MdEmail.col("eId", false)).inTable(MdEmail.TABLE_NAME);
      table.string(col("evStatus", false)).nullable();
      table.timestamp(col("evCreationDateTime", false)).defaultTo(knex.fn.now());
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
