import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import {JwtPayload} from "jsonwebtoken";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined = req.cookies.userID || req.headers.authorization;

  console.log("le token" +token);

  // Si vous avez le token dans l'en-tête avec le format "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log("test");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'aucun token' });
  }

  jwt.verify(token, "loginKey", (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Jeton non valide' });
    }

    //req.payload = payload;
    next();
  });
};
