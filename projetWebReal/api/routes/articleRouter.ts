import express from 'express';
const router = express.Router();
import { ArticleController } from '../controllers/articleController';
import {authenticateJWT} from "../middlewares/jwtMiddleware";

// Registration route
//todo rajouet le token
router.post('/add' ,ArticleController.addArticle);
router.post('/getByUser' ,ArticleController.getAllArticlesByUser);
router.get('/getAll' ,ArticleController.getAllArticles);

//module.exports = router;

export { router };