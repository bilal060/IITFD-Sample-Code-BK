import DoBase from "../../../base/dao/doBase";
import MdUser from "./mdUser";

class DoUser extends DoBase<MdUser> {
  constructor() {
    super(MdUser.TABLE_NAME);
  }
}

export default new DoUser();
