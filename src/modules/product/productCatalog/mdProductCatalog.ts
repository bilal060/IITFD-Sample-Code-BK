import BaseModel from "../../../base/model/mdBase";

class MdProductCatalog extends BaseModel {
  static TABLE_NAME = "product_catalog";

  constructor(
     public pcUuid: string,
     public pcCatalogId: string,
     public pcProductId : string,
  ) {
    super(pcUuid);
  }

  static col(k: keyof MdProductCatalog, prefix = true): string {
    return prefix ? `${MdProductCatalog.TABLE_NAME}.${k}` : k;
  }
}

export default MdProductCatalog;
