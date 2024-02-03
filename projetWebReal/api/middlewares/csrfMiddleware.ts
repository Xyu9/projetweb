// validate-csrf.middleware.js
import {NextFunction, Request, Response} from "express";

export const validateCSRF = (req: Request, res: Response, next: NextFunction) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {

    const clientCSRFToken = req.headers['x-xsrf-token'];

    const serverCSRFToken = req.cookies['XSRF-TOKEN'];

    console.error("token1" +clientCSRFToken)
    console.error("token2" +serverCSRFToken)

    if (!clientCSRFToken || clientCSRFToken !== serverCSRFToken) {
      return res.status(402).json({ message: 'jeton csrf non valide' });
    }
  }
  next();
};

module.exports = validateCSRF;
