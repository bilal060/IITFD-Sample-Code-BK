import BaseModel from "../../../base/model/mdBase";

class MdConfigs extends BaseModel {
  static TABLE_NAME = "configs";

  constructor(
    public cKey?: string,
    public cValue ?: string,
    public pId?: string,
  ) {
    super(pId);
  }

  static col(k: keyof MdConfigs, prefix = true): string {
    return prefix ? `${MdConfigs.TABLE_NAME}.${k}` : k;
  }
}

export default MdConfigs;
