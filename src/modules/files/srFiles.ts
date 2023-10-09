import { Transaction } from "knex";
import path from "path";
import { utGetYMDHPath } from "../shared/util/utString";
import { utCreateOrReplaceFileOnDisk, utDeleteFileSync, utFileExistSync } from "../shared/util/utFiles";
import { ExtensionType } from "../shared/types/tpShared";
import FileModel from "./mdFiles";
import MdUnprocessableEntityError from "../../base/error/mdUnprocessableEntityError";
import cfgApp from "../../base/config/cfgApp";
import DoFiles from "./doFiles";
import { ERR_FILE_NOT_EXISTS } from "../shared/constants/dtConstants";

class SrFiles {
  static saveFile(entityId: string, file: Express.Multer.File): string {
    const pathFromRootAssetsDir = path.normalize(
      path.join(cfgApp.assetsPath, utGetYMDHPath()),
    );
    const dirFullPath = path.resolve(pathFromRootAssetsDir);
    const filePathInDir = path.join(pathFromRootAssetsDir, `${entityId}${path.extname(file.originalname)}`);
    utCreateOrReplaceFileOnDisk(
      dirFullPath, filePathInDir, file.buffer,
    );

    return filePathInDir;
  }

  static async addFile(trx: Transaction, entityId: string, file: Express.Multer.File): Promise<FileModel> {
    const filePathInDir = this.saveFile(entityId, file);

    const [fileModel] = await DoFiles.insertOne(trx, {
      fEntityId: entityId,
      fExtension: path.extname(file.originalname) as ExtensionType,
      fName: file.originalname,
      fPath: filePathInDir,
      fType: "image",
    });

    return fileModel;
  }

  static async updateFile(trx: Transaction, fileId: string, file: Express.Multer.File): Promise<FileModel> {
    const existingFile = await DoFiles.findOneByCol(trx, "fId", fileId);

    if (existingFile) {
      const fileFullPath = path.resolve(existingFile.fPath);
      if (utFileExistSync(fileFullPath)) {
        utDeleteFileSync(fileFullPath);
      }
      const filePathInDir = this.saveFile(fileId, file);

      const [fileModel] = await DoFiles.updateOneByColName(trx, {
        fExtension: path.extname(file.originalname) as ExtensionType,
        fName: file.originalname,
        fPath: filePathInDir,
      }, "fId", fileId);

      return fileModel;
    }

    throw new MdUnprocessableEntityError(ERR_FILE_NOT_EXISTS);
  }
}

export default SrFiles;
