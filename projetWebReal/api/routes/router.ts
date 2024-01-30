import express, {Request, Response} from "express";

import { router as userRouter } from "./userRouter"
import { router as articleRouter } from "./articleRouter"
import {ArticleController} from "../controllers/articleController";

let router = express.Router();

router.get('/', function (req: Request, res: Response ): void {
  res.send('coucou');
});
router.use('/articles', articleRouter);
router.use('/auth', userRouter);

export { router }
