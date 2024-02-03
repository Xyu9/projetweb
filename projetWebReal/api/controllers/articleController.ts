import { Request, Response } from "express";
import { Article } from "../models/article";
import bcrypt from "bcrypt";
import {User} from "../models/users";
import {Types} from "mongoose";
import {UUID} from "node:crypto";
import {Observable} from "rxjs";

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
    const userId = req.body.user;


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


  static deleteArticle = async (req: Request, res: Response) => {
    const articleId = req.body.id;


    try {

      if (!Types.ObjectId.isValid(articleId)) {

        return res.status(400).json({ message: 'Invalid article ID' });
      }


      const deletedArticle = await Article.findByIdAndDelete(articleId);


      if (!deletedArticle) {
        console.log('Article not found:', articleId);
        return res.status(404).json({ message: 'Article not found' });
      }

      return res.status(200).json({ message: 'Article deleted', article: deletedArticle });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  static update = async (req: Request, res: Response) => {
    const { _id, title, content, date, user } = req.body;


    try {
      console.log('Update Request:', req.body);

      if (!Types.ObjectId.isValid(_id)) {
        console.log('Invalid ObjectId:', _id);
        return res.status(400).json({ message: 'Invalid article ID' });
      }

      const updatedArticle = await Article.findByIdAndUpdate(_id, { title, content, date }, { new: true });

      if (!updatedArticle) {
        console.log('Article not found:', _id);
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
