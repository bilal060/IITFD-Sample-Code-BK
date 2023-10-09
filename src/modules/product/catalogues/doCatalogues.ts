import DoBase from "../../../base/dao/doBase";
import MdCatalogues from "./mdCatalogues";

class DoCatalogues extends DoBase<MdCatalogues> {
  constructor() {
    super(MdCatalogues.TABLE_NAME);
  }
}

export default new DoCatalogues();
