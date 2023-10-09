import { Transaction } from "knex";
import Knex from "../../base/database/cfgKnex";
import DoBase from "../../base/dao/doBase";
import MdCompanyDetail from "./mdCompanyDetail";
import MdEntity from "../entity/mdEntity";
import MdAddress from "../address/mdAddress";
import MdEmail from "../shared/models/mdEmail";
import MdPhone from "../auth/phone/mdPhone";
import MdCountry from "../country/mdCountry";
import MdCity from "../city/mdCity";

const selectedColumns = [
  Knex.ref(MdCompanyDetail.col("cdEntityId")).as("id"),
  MdCompanyDetail.col("cdId"),
  MdCompanyDetail.col("cdName"),
  MdEntity.col("ePriType"),
  MdEntity.col("eStatus"),
  MdEmail.col("eEmail"),
  MdPhone.col("pPhone"),
  MdCity.col("cName"),
  MdAddress.col("aCityId"),
  MdAddress.col("aCountryId"),
  MdAddress.col("aAddressLine1"),
  MdAddress.col("aCountryId"),
  MdAddress.col("aAddressLine2"),
  MdAddress.col("aZip"),
  Knex.ref(MdCountry.col("cName")).as("countryName"),
];
class DoCompanyDetail extends DoBase<MdCompanyDetail> {
  constructor() {
    super(MdCompanyDetail.TABLE_NAME);
  }

  getCompanyDetail(trx:Transaction) {
    return trx(this.tableName)
      .select(selectedColumns)
      .join(MdEntity.TABLE_NAME, MdEntity.col("eEuid"), this.col("cdEntityId"))
      .join(MdAddress.TABLE_NAME, MdAddress.col("aEntityId"), this.col("cdEntityId"))
      .join(MdEmail.TABLE_NAME, MdEmail.col("eEntityId"), this.col("cdEntityId"))
      .join(MdPhone.TABLE_NAME, MdPhone.col("pEntityId"), this.col("cdEntityId"))
      .join(MdCountry.TABLE_NAME, MdCountry.col("cId"), MdAddress.col("aCountryId"))
      .join(MdCity.TABLE_NAME, MdCity.col("cId"), MdAddress.col("aCityId"));
  }
}

export default new DoCompanyDetail();
