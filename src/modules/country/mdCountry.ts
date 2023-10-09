import BaseModel from "../../base/model/mdBase";

class MdCountry extends BaseModel {
  static TABLE_NAME = "country";

  constructor(
     public cName: string,
     public cId: string,
  ) {
    super(cId);
  }

  static col(k: keyof MdCountry, prefix = true): string {
    return prefix ? `${MdCountry.TABLE_NAME}.${k}` : k;
  }
}

export default MdCountry;
