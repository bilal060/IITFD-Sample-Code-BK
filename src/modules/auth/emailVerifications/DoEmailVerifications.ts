import DoBase from "../../../base/dao/doBase";
import MdEmailVerification from "../../shared/models/mdEmailVerification";

class DoEmailVerification extends DoBase<MdEmailVerification> {
  constructor() {
    super(MdEmailVerification.TABLE_NAME);
  }
}

export default new DoEmailVerification();
