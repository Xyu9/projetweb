import express from 'express';
const router = express.Router();
import {userController} from '../controllers/userController';
import { usersMiddleware } from "../middlewares/usersMiddleware";


router.post('/register',usersMiddleware.accountNotExist, userController.register);
router.post('/login',usersMiddleware.accountExist ,userController.login);


export { router };
