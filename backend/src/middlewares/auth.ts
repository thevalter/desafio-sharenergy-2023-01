import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { authConfig } from '../config/auth';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request | any, res: Response, next: NextFunction) => {

   const token = req.headers.authorization;

   if (!token) {
      return res.status(401).json({ error: 'token was not provided.' })
   }

   try {

      const replace = token.replace("Bearer ", "");
      jwt.verify(replace, String(authConfig.secret));
      next();
      
   } catch (err) {
      return res.status(401).json({ err: 'invalid token' })
   }
}