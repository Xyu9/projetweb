import {checkSchema, validationResult} from "express-validator";
import {ExistsOptions} from "express-validator/src/chain";
import {NextFunction, Request, Response} from "express";
import {User} from "../models/users";

export class TodoMiddleware {
  static todoCreateValidate(req: Request, res: Response, next: NextFunction) {
    checkSchema( {
      text: {
        exists: true,
        trim: true,
        isLength: { options: { min: 1 } },
        errorMessage: "Le texte est requis"
      }
    },['body']);
    const result = validationResult(req);
    if (result.isEmpty()) {
      next();
    }
    else {
      res.status(400).json(result.array);
    }
  }

  static todoNotExist(req: Request, res: Response, next: NextFunction) {
    User.findOne({ text: req.body.text }).exec()
      .then((user) => {
        if (user) {
          res.locals.todo = user;
          next();
        } else {
          res.status(400).send("N'existe pas");
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Server Error");
      });
  }

}

