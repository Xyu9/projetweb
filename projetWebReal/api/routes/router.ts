import express, {Request, Response} from "express";
import session from 'express-session';

import { router as userRouter } from "./userRouter";
import { router as articleRouter } from "./articleRouter";



let router = express.Router();
const crypto = require('crypto');


router.get('/generate-csrf-token', (req, res) => {
  try {
    const sessionId = req.sessionID;
    const applicationKey = 'csrfKey';
    const csrfToken = crypto.createHmac('sha256', applicationKey).update(sessionId).digest('hex');

    console.error('Session ID:', sessionId);
    console.error('Application Key:', applicationKey);
    console.error('CSRF Token:', csrfToken);

    res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: false });

    res.status(200).json({ csrfToken });
  } catch (error) {
    console.error('Erreur de la generation du token csrf:', error);
    res.status(500).json({ error: 'Erreur Interne du serveur' });
  }
});


router.use('/articles', articleRouter);
router.use('/auth', userRouter);


export { router }
