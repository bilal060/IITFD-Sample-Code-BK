import Knex, { QueryBuilder } from "knex";
import MdProductCatalog from "../../../../modules/product/productCatalog/mdProductCatalog";
import MdProducts from "../../../../modules/product/products/mdProducts";
import MdCatalogues from "../../../../modules/product/catalogues/mdCatalogues";

const { TABLE_NAME, col } = MdProductCatalog;

export async function up(knex: Knex): Promise<QueryBuilder> {
  return knex.schema
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    .createTable(TABLE_NAME, (table) => {
      table.uuid(col("pcUuid", false)).primary().defaultTo(knex.raw("uuid_generate_v4()")).notNullable();
      table.uuid(col("pcCatalogId", false)).references(MdCatalogues.col("ctUuid", false)).inTable(MdCatalogues.TABLE_NAME);
      table.uuid(col("pcProductId", false)).references(MdProducts.col("pUuid", false)).inTable(MdProducts.TABLE_NAME);
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
