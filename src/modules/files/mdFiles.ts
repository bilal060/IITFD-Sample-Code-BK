import MdBase from "../../base/model/mdBase";
import { ExtensionType, TypeType } from "../shared/types/tpShared";

class MdFiles extends MdBase {
  static TABLE_NAME = "file";

  constructor(
    public fPath: string,
    public fName: string,
    public fEntityId: string,
    public fExtension: ExtensionType,
    public fType: TypeType,
    public fId?: string,
  ) {
    super();
  }

  static col(k: keyof MdFiles, prefix = true): string {
    return prefix ? `${MdFiles.TABLE_NAME}.${k}` : k;
  }

  static extension(k: MdFiles["fExtension"]): ExtensionType {
    return k as ExtensionType;
  }

  static type(k: MdFiles["fType"]): ExtensionType {
    return k as ExtensionType;
  }
}

export default MdFiles;
