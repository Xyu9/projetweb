import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/users";

export const usersMiddleware = {
  accountExist: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    try {
      const user: any | null = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  accountNotExist: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    try {
      const user: any | null = await User.findOne({ username });

      if (user) {
        return res.status(405).json({ message: 'Compte Existant' });
      }


      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user = req.cookies['userID'];

      if (user) {

        next();
      } else {
        return res.status(401).json({ message: 'User not logged in' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
