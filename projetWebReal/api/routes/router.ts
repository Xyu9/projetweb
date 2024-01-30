import express, {Request, Response} from "express";
//import { router as userRouter } from "./userRouter"

let router = express.Router();

router.get('/', function (req: Request, res: Response ): void {
  res.send('coucou');
});
//router.use('/todos', todoRouter);

export { router }
