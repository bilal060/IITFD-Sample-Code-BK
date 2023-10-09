import BaseErrorModel from "./mdBaseError";

class MdForbiddenError extends BaseErrorModel {
  constructor(message: string) {
    super(message, 403, "Forbidden request");
  }
}

export default MdForbiddenError;
