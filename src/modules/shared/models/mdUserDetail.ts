import BaseModel from "../../../base/model/mdBase";

class MdUserDetail extends BaseModel {
  static TABLE_NAME = "user_detail";

  constructor(
     public udEntityId?: string,
     public udFirstname?: string,
     public udLastname?: string,
     public udGender?: string,
     public udDateOfBirth?: string,
     public udId?: string,
  ) {
    super(udId);
  }

  static col(k: keyof MdUserDetail, prefix = true): string {
    return prefix ? `${MdUserDetail.TABLE_NAME}.${k}` : k;
  }
}

export default MdUserDetail;
