import DoBase from "../../../base/dao/doBase";
import MdConfigs from "../models/mdConfigs";

class DoConfigs extends DoBase<MdConfigs> {
  constructor() {
    super(MdConfigs.TABLE_NAME);
  }
}

export default new DoConfigs();
