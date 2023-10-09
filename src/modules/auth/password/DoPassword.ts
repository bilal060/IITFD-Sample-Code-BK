import DoBase from "../../../base/dao/doBase";
import MdPassword from "../../shared/models/mdPassword";

class DoPassword extends DoBase<MdPassword> {
  constructor() {
    super(MdPassword.TABLE_NAME);
  }
}

export default new DoPassword();
