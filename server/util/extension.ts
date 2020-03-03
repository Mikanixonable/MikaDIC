//

import {
  UserDocument
} from "/server/model/user";


declare module "express-serve-static-core" {
  interface Request<P extends Params = ParamsDictionary> {

    user?: UserDocument;
    token?: string;

  }
}