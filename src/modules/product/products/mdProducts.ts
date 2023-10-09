import BaseModel from "../../../base/model/mdBase";

class MdProducts extends BaseModel {
  static TABLE_NAME = "products";

  constructor(
    public pName: string,
    public pUuid: string,
    public pCategoryId: string,
    public pPrice: string,
    public pDescription: string,
    public pUserId: string,
  ) {
    super(pUuid);
  }

  static col(k: keyof MdProducts, prefix = true): string {
    return prefix ? `${MdProducts.TABLE_NAME}.${k}` : k;
  }
}

export default MdProducts;
