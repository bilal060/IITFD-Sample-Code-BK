import BaseModel from "../../../base/model/mdBase";

class MdEmailVerification extends BaseModel {
  static TABLE_NAME = "email_verifications";

  constructor(
     public evEntityId?: string,
     public evEmailId?: string,
     public evCreationDateTime?: string,
     public evStatus?: string,
     public evId?: string,
  ) {
    super(evId);
  }

  static col(k: keyof MdEmailVerification, prefix = true): string {
    return prefix ? `${MdEmailVerification.TABLE_NAME}.${k}` : k;
  }
}

export default MdEmailVerification;
