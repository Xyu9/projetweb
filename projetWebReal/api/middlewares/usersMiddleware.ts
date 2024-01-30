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

      // Attach the user to the request object for future middleware/routes
      //req.user = user;

      next(); // Continue to the next middleware or route
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
        return res.status(401).json({ message: 'Compte Existant' });
      }

      // Attach the user to the request object for future middleware/routes
      //req.user = user;

      next(); // Continue to the next middleware or route
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
