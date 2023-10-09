import BaseModel from "../../../base/model/mdBase";

class MdCategories extends BaseModel {
  static TABLE_NAME = "categories";

  constructor(
     public cName: string,
     public cUuid: string,
  ) {
    super(cUuid);
  }

  static col(k: keyof MdCategories, prefix = true): string {
    return prefix ? `${MdCategories.TABLE_NAME}.${k}` : k;
  }
}

export default MdCategories;
