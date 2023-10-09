import DoBase from "../../base/dao/doBase";
import MdFiles from "./mdFiles";

class DoFiles extends DoBase<MdFiles> {
  constructor() {
    super(MdFiles.TABLE_NAME);
  }
}

export default new DoFiles();
