import express from 'express';
const router = express.Router();
import {userController} from '../controllers/userController';

// Registration route
router.post('/register', userController.register);
router.post('/login', userController.login);

//module.exports = router;

export { router };
