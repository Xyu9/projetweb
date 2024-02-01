import { Request, Response } from "express";
import { Article } from "../models/article";
import bcrypt from "bcrypt";
import {User} from "../models/users";

export class ArticleController {

  static addArticle = async (req: Request, res: Response) => {
    console.log('ajout...');
    const { title, content, date, user } = req.body;

    console.log('infos...' + title + content, date, user);

    try {
      const newArticle = new Article({ title, content, date, user });
      await newArticle.save();

      return res.status(201).json({ message: 'Article ajouté' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  static getAllArticlesByUser = async (req: Request, res: Response) => {
    const userId = req.body.user; // Assuming the user ID is sent in the request body

    try {
      const articles = await Article.find({ user: userId }).exec();

      return res.status(200).json({ articles });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  static getAllArticles = async (req: Request, res: Response) => {
    try {
      const articles = await Article.find().exec();
      return res.status(200).json({ articles });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

  };


}
