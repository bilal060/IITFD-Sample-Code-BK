import MdBase from "../../base/model/mdBase";

class MdAddress extends MdBase {
  static TABLE_NAME = "addresses";

  constructor(
     public aEntityId: string,
     public aAddressLine1: string,
     public aAddressLine2: string,
     public aZip: number,
     public aCityId: string,
     public aCountryId: string,
     public aId: string,
  ) {
    super(aId);
  }

  static col(k: keyof MdAddress, prefix = true): string {
    return prefix ? `${MdAddress.TABLE_NAME}.${k}` : k;
  }
}

export default MdAddress;
