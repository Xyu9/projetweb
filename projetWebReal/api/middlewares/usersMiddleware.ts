import {checkSchema, validationResult} from "express-validator";
import {ExistsOptions} from "express-validator/src/chain";
import {NextFunction, Request, Response} from "express";
import {User} from "../models/users";

export class userMiddleware {

  static isAdmin(req: Request, res: Response, next: NextFunction) {
    let isAdmin;
    if (!isAdmin) {
      res.sendStatus(403);
    }
    else {
      next();
    }
  }

}

