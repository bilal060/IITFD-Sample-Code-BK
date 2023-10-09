import MdBase from "../../../base/model/mdBase";

class MdUser extends MdBase {
  static TABLE_NAME = "users";

  constructor(
     public username: string,
     public password: string,
     public status? : "ACTIVE"|"INACTIVE"|"UNVERIFIED",
     public type? : string,
     id?: string,
  ) {
    super(id);
  }

  static col(k: keyof MdUser, prefix = true): string {
    return prefix ? `${MdUser.TABLE_NAME}.${k}` : k;
  }
}

export default MdUser;
