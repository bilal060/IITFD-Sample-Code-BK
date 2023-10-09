import DoBase from "../../base/dao/doBase";
import MdCountry from "./mdCountry";

class DoCountry extends DoBase<MdCountry> {
  constructor() {
    super(MdCountry.TABLE_NAME);
  }
}

export default new DoCountry();
