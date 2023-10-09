import DoBase from "../../../base/dao/doBase";
import MdPhone from "./mdPhone";

class DoPhone extends DoBase<MdPhone> {
  constructor() {
    super(MdPhone.TABLE_NAME);
  }
}

export default new DoPhone();
