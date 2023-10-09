import MdBase from "../../base/model/mdBase";

class MdEntity extends MdBase {
  static TABLE_NAME = "entity";

  constructor(
     public ePriType?: string,
     public eStatus?: string,
     public eEuid?: string,
  ) {
    super(eEuid);
  }

  static col(k: keyof MdEntity, prefix = true): string {
    return prefix ? `${MdEntity.TABLE_NAME}.${k}` : k;
  }
}

export default MdEntity;
