import express from 'express';
const router = express.Router();
import { ArticleController } from '../controllers/articleController';
import { authenticateJWT } from '../middlewares/jwtMiddleware';
import {usersMiddleware} from "../middlewares/usersMiddleware";


router.post('/add',usersMiddleware.isLoggedIn, authenticateJWT, ArticleController.addArticle);
router.post('/getByUser',usersMiddleware.isLoggedIn, authenticateJWT, ArticleController.getAllArticlesByUser);


router.get('/getAll',usersMiddleware.isLoggedIn, ArticleController.getAllArticles);
router.put('/update',usersMiddleware.isLoggedIn, authenticateJWT, ArticleController.update);
router.delete('/delete',usersMiddleware.isLoggedIn, authenticateJWT, ArticleController.deleteArticle);

export { router };
