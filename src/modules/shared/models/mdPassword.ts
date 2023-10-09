import BaseModel from "../../../base/model/mdBase";

class MdPassword extends BaseModel {
  static TABLE_NAME = "password";

  constructor(
    public pEntityId?: string,
    public pPassword?: string,
    public pId?: string,
  ) {
    super(pId);
  }

  static col(k: keyof MdPassword, prefix = true): string {
    return prefix ? `${MdPassword.TABLE_NAME}.${k}` : k;
  }
}

export default MdPassword;
