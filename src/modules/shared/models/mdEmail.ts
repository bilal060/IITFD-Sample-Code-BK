import BaseModel from "../../../base/model/mdBase";

class MdEmail extends BaseModel {
  static TABLE_NAME = "email";

  constructor(
     public eEntityId?: string,
     public eEmail?: string,
     public eType?: string,
     public eId?: string,
  ) {
    super(eId);
  }

  static col(k: keyof MdEmail, prefix = true): string {
    return prefix ? `${MdEmail.TABLE_NAME}.${k}` : k;
  }
}

export default MdEmail;
