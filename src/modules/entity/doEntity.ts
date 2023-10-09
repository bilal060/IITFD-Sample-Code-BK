import DoBase from "../../base/dao/doBase";
import MdEntity from "./mdEntity";

class DoEntity extends DoBase<MdEntity> {
  constructor() {
    super(MdEntity.TABLE_NAME);
  }
}

export default new DoEntity();
