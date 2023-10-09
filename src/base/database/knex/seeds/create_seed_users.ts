import * as Knex from "knex";
import MdUser from "../../../../modules/auth/user/mdUser";
import SrBcryptHashing from "../../../service/srBcrypt";

export async function seed(knex: Knex): Promise<any> {
  await knex(MdUser.TABLE_NAME).del();

  await knex(MdUser.TABLE_NAME).insert([
    {
      username: "1",
      password: await SrBcryptHashing.bcryptHash("2"),
    },
  ]);
}
