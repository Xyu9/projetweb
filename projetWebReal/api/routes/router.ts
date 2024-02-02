import express, {Request, Response} from "express";
import session from 'express-session';

import { router as userRouter } from "./userRouter";
import { router as articleRouter } from "./articleRouter";



let router = express.Router();
const crypto = require('crypto');


router.get('/generate-csrf-token', (req, res) => {
  try {
    // Générez le jeton CSRF (par exemple, avec l'ID de session et une clé d'application)
    const sessionId = req.sessionID; // Exemple avec l'ID de session
    const applicationKey = 'csrfKey'; // Remplacez par votre clé d'application
    const csrfToken = crypto.createHmac('sha256', applicationKey).update(sessionId).digest('hex');

    // Log intermediate values
    console.log('Session ID:', sessionId);
    console.log('Application Key:', applicationKey);
    console.log('CSRF Token:', csrfToken);

    // Placez le jeton dans le cookie XSRF-TOKEN
    res.cookie('XSRF-TOKEN', csrfToken, { httpOnly: false });

    res.status(200).json({ csrfToken });
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.use('/articles', articleRouter);
router.use('/auth', userRouter);


export { router }
