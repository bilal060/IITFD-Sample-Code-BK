import BaseModel from "../../base/model/mdBase";

class MdCity extends BaseModel {
  static TABLE_NAME = "city";

  constructor(
     public cName: string,
     public cCountryId: string,
     public cId: string,
  ) {
    super(cId);
  }

  static col(k: keyof MdCity, prefix = true): string {
    return prefix ? `${MdCity.TABLE_NAME}.${k}` : k;
  }
}

export default MdCity;
