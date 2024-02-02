import express from 'express';
const router = express.Router();
import { ArticleController } from '../controllers/articleController';
import { authenticateJWT } from '../middlewares/jwtMiddleware';

// Registration route
router.post('/add', authenticateJWT, ArticleController.addArticle);
router.post('/getByUser', authenticateJWT, ArticleController.getAllArticlesByUser);


router.get('/getAll', authenticateJWT, ArticleController.getAllArticles);
router.put('/update', authenticateJWT, ArticleController.update);
router.delete('/delete', authenticateJWT, ArticleController.deleteArticle);

export { router };
