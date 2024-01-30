import { Request, Response} from "express";
import { Todo } from "../models/todo";
import * as jwt from 'jsonwebtoken';

export class TodoController {
    static getAll(req: Request, res: Response) {
        res.json( [
                {
                    id: 1,
                    text: "Oui",
                    checked: false
                },
                {
                    id: 2,
                    text: "STP",
                    checked:false
                },
                {
                    id: 3,
                    text: "Louis",
                    checked: false
                }
            ]
        );
    }
    static create(req: Request, res: Response) {
      console.log(req.body);
      Todo.create( {
          text: req.body.text,
          checked: false
        }).then(() => {
          res.status(201).json({ message: "OK créé" });
      })
        .catch(error => {
          res.status(500).json( { message: "Erreur BD "});
      })
    }

    static login(req: Request, res: Response) {
        const jwtToken = jwt.sign(
            { userId: 12},
            "fneinfiwninfeiwefniwfef",
            { expiresIn: 10 }
        );
                          //mettre nom secu
        res.cookie("SESSIONID", jwtToken)
        //res.cookie("SESSIONID", jwtToken, { httpOnly:true })
        //res.cookie("role", 1);
    }


}
