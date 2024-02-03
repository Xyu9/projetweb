import express, { Express, Request, Response } from "express";
import { userController } from "./controllers/userController";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "./config/bd";
import {router} from "./routes/router";
import session from "express-session";
const validateCSRFMiddleware = require('./middlewares/csrfMiddleware');


const cors = require('cors');

const app: Express = express();

app.use(cors());

app.use(session({
  secret: 'csrfKey',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(validateCSRFMiddleware);

app.use(router);

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
