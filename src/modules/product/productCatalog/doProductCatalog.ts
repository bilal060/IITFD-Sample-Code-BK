import DoBase from "../../../base/dao/doBase";
import MdProductCatalog from "./mdProductCatalog";

class DoProductCatalog extends DoBase<MdProductCatalog> {
  constructor() {
    super(MdProductCatalog.TABLE_NAME);
  }
}

export default new DoProductCatalog();
