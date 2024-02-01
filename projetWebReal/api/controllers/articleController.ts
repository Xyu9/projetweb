import { Request, Response } from "express";
import { Article } from "../models/article";
import bcrypt from "bcrypt";
import {User} from "../models/users";
import {Types} from "mongoose";

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
      console.log(articles)
      return res.status(200).json({ articles });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

  };
  static update = async (req: Request, res: Response) => {
    const { id, title, content, date, user } = req.body;

    console.log("le id:"+id)

    try {
      console.log('Update Request:', req.body);

      // Check if the provided ID is a valid ObjectId
      if (!Types.ObjectId.isValid(id)) {
        console.log('Invalid ObjectId:', id);
        return res.status(400).json({ message: 'Invalid article ID' });
      }

      // Find the article by ID and update its fields
      const updatedArticle = await Article.findByIdAndUpdate(id, { title, content }, { new: true });

      // Check if the article was found and updated
      if (!updatedArticle) {
        console.log('Article not found:', id);
        return res.status(404).json({ message: 'Article not found' });
      }

      console.log('Article updated successfully:', updatedArticle);
      return res.status(200).json({ message: 'Article updated', article: updatedArticle });
    } catch (error) {
      console.error('Error during article update:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };



}
