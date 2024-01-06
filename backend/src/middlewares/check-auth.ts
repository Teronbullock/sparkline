import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const result = dotenv.config({ path: 'backend/.env' });

interface expressMiddleware {
  (req: express.Request, res: express.Response, next: express.NextFunction): void;
}

interface CustomError extends Error {
  status?: number;
  cause?: string;
  local?: string;
}

export const checkAuth: expressMiddleware = (req, res, next) => {
  try {

    if (req.headers.authorization === undefined) {
      throw new Error('Unauthorized');
    }

    const token = req.headers.authorization.split(' ')[1]; 

    if (token === 'null') {
      throw new Error('Unauthorized');
    }
    
    if ( process.env.JWT_SECRET !== undefined ) {
      interface DecodedToken {

        userId?: string;
      }

      interface ReqObj extends Request {
        userData?: object;
      }

      if (token){
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        (req as any).userData = { userId: (decodedToken as any).userId };
        next();
      }
    }

  } catch (error) {
    let err = error as CustomError;
    err.status = 401;

    return next(err);
  }

};