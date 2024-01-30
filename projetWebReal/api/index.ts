import express, { Express, Request, Response } from "express";
import { userController } from "./controllers/userController";
import bodyParser from "body-parser";
import "./config/bd";
import {router} from "./routes/router";

const cors = require('cors');

const app: Express = express();

app.use(cors());

app.use(bodyParser.json());

//app.get('/register', userController.register);
app.post('/register', userController.register);

app.use(router);

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
