import DoBase from "../../../base/dao/doBase";
import MdProducts from "./mdProducts";

class DoProducts extends DoBase<MdProducts> {
  constructor() {
    super(MdProducts.TABLE_NAME);
  }
}

export default new DoProducts();
