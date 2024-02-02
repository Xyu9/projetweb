import { Request, Response } from "express";
import { User } from "../models/users";
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

export class userController {
  static register = async (req: Request, res: Response) => {
    console.log('Registering...');
    const { username, password } = req.body;

    console.log('infos...' + username + password);

    try {


      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ username, password: hashedPassword, salt });

      await newUser.save();

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  static login = async (req: Request, res: Response) => {
    console.log('Logging in...');
    const { username, password } = req.body;

    try {
      const user: any | null = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }


      const jwtToken = jwt.sign({ username }, "loginKey", { expiresIn: 5000 });

      res.cookie("userID", jwtToken, { httpOnly: true });
      console.log("le token logging" + req.cookies.userID);





      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
