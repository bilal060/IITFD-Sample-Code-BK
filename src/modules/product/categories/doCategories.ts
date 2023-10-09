import DoBase from "../../../base/dao/doBase";
import MdCategories from "./mdCategories";

class DoCategories extends DoBase<MdCategories> {
  constructor() {
    super(MdCategories.TABLE_NAME);
  }
}

export default new DoCategories();
