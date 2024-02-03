import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import {JwtPayload} from "jsonwebtoken";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined = req.cookies.userID || req.headers.authorization;

  console.log("le token" +token);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'aucun token' });
  }

  jwt.verify(token, "loginKey", (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Jeton non valide' });
    }

    next();
  });
};
