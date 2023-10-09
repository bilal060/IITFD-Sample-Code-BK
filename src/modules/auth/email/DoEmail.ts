import DoBase from "../../../base/dao/doBase";
import MdEmail from "../../shared/models/mdEmail";

class DoEmail extends DoBase<MdEmail> {
  constructor() {
    super(MdEmail.TABLE_NAME);
  }
}

export default new DoEmail();
