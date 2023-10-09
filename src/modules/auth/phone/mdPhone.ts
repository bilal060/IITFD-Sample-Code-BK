import BaseModel from "../../../base/model/mdBase";

class MdPhone extends BaseModel {
  static TABLE_NAME = "phone";

  constructor(
     public pEntityId: string,
     public pPhone: string,
     public pId: string,
  ) {
    super(pId);
  }

  static col(k: keyof MdPhone, prefix = true): string {
    return prefix ? `${MdPhone.TABLE_NAME}.${k}` : k;
  }
}

export default MdPhone;
