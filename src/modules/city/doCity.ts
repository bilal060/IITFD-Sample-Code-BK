import DoBase from "../../base/dao/doBase";
import MdCity from "./mdCity";

class DoCity extends DoBase<MdCity> {
  constructor() {
    super(MdCity.TABLE_NAME);
  }
}

export default new DoCity();
