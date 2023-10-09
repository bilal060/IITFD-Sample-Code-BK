import DoBase from "../../base/dao/doBase";
import MdUserDetail from "../shared/models/mdUserDetail";

class DoUserDetail extends DoBase<MdUserDetail> {
  constructor() {
    super(MdUserDetail.TABLE_NAME);
  }
}

export default new DoUserDetail();
