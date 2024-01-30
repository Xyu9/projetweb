import express, { Express, Request, Response } from "express";
import { userController } from "./controllers/userController";
import bodyParser from "body-parser";
import "./config/bd";
import {router} from "./routes/router";

const app: Express = express();

app.get('/register', userController.register);
app.use(bodyParser.json());
app.use(router);

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
