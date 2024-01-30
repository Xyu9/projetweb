import { Request, Response } from "express";
import { User } from "../models/users";

export class userController {
  static register = async (req: Request, res: Response) => {
    console.log('Registering...');
    const { username, password } = req.body;

    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Create a new user
      const newUser = new User({ username, password });

      // Save the user to the database
      await newUser.save();

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
