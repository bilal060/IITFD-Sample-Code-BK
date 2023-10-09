import BaseModel from "../../../base/model/mdBase";

class MdCatalogues extends BaseModel {
  static TABLE_NAME = "catalogues";

  constructor(
     public cName: string,
     public ctUuid: string,
     public entityId: string,
  ) {
    super(ctUuid);
  }

  static col(k: keyof MdCatalogues, prefix = true): string {
    return prefix ? `${MdCatalogues.TABLE_NAME}.${k}` : k;
  }
}

export default MdCatalogues;
