// validate-csrf.middleware.js
import {NextFunction, Request, Response} from "express";

export const validateCSRF = (req: Request, res: Response, next: NextFunction) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    // Récupérez le jeton CSRF de la requête
    const clientCSRFToken = req.headers['x-xsrf-token'];

    // Récupérez le jeton CSRF du cookie
    const serverCSRFToken = req.cookies['XSRF-TOKEN'];

    // Comparez les jetons
    if (!clientCSRFToken || clientCSRFToken !== serverCSRFToken) {
      return res.status(402).json({ message: 'jeton csrf non valide' });
    }
  }
  next();
};

module.exports = validateCSRF;
