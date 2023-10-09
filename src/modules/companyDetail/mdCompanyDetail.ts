import BaseModel from "../../base/model/mdBase";

class MdCompanyDetail extends BaseModel {
  static TABLE_NAME = "company_detail";

  constructor(
     public cdEntityId?: string,
     public cdName?: string,
     public cdId?: string,
  ) {
    super(cdId);
  }

  static col(k: keyof MdCompanyDetail, prefix = true): string {
    return prefix ? `${MdCompanyDetail.TABLE_NAME}.${k}` : k;
  }
}

export default MdCompanyDetail;
