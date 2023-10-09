import DoBase from "../../base/dao/doBase";
import MdAddress from "./mdAddress";

class DoAddress extends DoBase<MdAddress> {
  constructor() {
    super(MdAddress.TABLE_NAME);
  }
}
export default new DoAddress();
