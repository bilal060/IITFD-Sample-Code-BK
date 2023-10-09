import Knex, { QueryBuilder } from "knex";
import MdEntity from "../../../../modules/entity/mdEntity";
import MdCatalogues from "../../../../modules/product/catalogues/mdCatalogues";

const { TABLE_NAME, col } = MdCatalogues;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("ctUuid", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.string(col("cName", false));
      table.uuid(col("entityId", false)).references(MdEntity.col("eEuid", false)).inTable(MdEntity.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
