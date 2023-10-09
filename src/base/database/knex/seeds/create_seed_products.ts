import * as Knex from "knex";
import MdProducts from "../../../../modules/product/products/mdProducts";

export async function seed(knex: Knex): Promise<any> {
  await knex(MdProducts.TABLE_NAME).del();

  await knex(MdProducts.TABLE_NAME).insert([
    {
      pName: "Mobile",
      pPrice: "1100",
      pDescription: "This is Mobile",
    },
    {
      pName: "Laptop",
      pPrice: "1200",
      pDescription: "This is Mobile",
    },
    {
      pName: "Headphones",
      pPrice: "1300",
      pDescription: "This is HeadPhones",
    },
    {
      pName: "Mouse",
      pPrice: "1400",
      pDescription: "This is Mouse",
    },
    {
      pName: "Spaeker",
      pPrice: "1500",
      pDescription: "This is Speaker",
    },
  ]);
}
