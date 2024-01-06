
import express, {request, response, NextFunction} from 'express';
import { User } from '../models/user-model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';


const result = dotenv.config({ path: 'backend/.env' });

interface expressMiddleware {
  (req: express.Request, res: express.Response, next: express.NextFunction): void;
}

interface CustomError extends Error {
  status?: number;
  cause?: string;
  local?: string;
}

export const getUser: expressMiddleware = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users === null || users.length === 0) {
      throw new Error('No users found');
    }

    res.status(200).json(users);

  } catch (error) {
    let err = error as CustomError;
    err.status = 400;

    next(err);    
  }
};

export const addUser: expressMiddleware = async (req, res, next) => {
  if (req.body.email &&
    req.body.firstName &&
    req.body.lastName &&
    req.body.password) {
    
    // check password match
    if (req.body.password !== req.body.confirmPassword) {
      let err = new Error('Passwords do not match') as CustomError;
      err.status = 400;

      return next(err);
    }

    let userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };

    (async ()=> {
      try {
        const newUser = await User.create(userData);
        let token;

        try {
          if (process.env.JWT_SECRET) {
            token = jwt.sign(
              { userId: newUser._id, email: newUser.email },
              process.env.JWT_SECRET, 
              {expiresIn: '1h'}
            );
          } else {
            throw new Error('Error signing token');
          }

        } catch (error) {
          let err = error as CustomError;
          err.status = 500;
          err.local = 'addUser function';

          return next(err);
        }

        console.log('User created');

        // Send the response to the client
        res.status(200).json({
          message: 'User created',
          token: token,
          userId: newUser._id,
          userEmail: newUser.email
        });
  
      } catch (error) {
        let err = error as CustomError;
        err.status = 400;
        
        return next(err);
      }
    })()
    

  } else {
    let err = new Error('Error All fields are required.') as CustomError;
    err.status = 400;
    err.local = 'addUser function';

    return next(err);
  }
};


export const loginUser: expressMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  let isAuthenticated = false;

  if (email && password) {

    try {

      const userInfo = await User.findOne({ email: email }).exec();
      
      // If the user is not found, return an error.
      if (!userInfo) {
        throw new Error('User not found');
      }

      isAuthenticated = await bcrypt.compare(password, userInfo.password);

      if (!isAuthenticated) {
        throw new Error('Password is incorrect');
      }

      console.log('User login successful');
      
      let token;
      try {
        if (process.env.JWT_SECRET) {
          token = jwt.sign(
            { userId: userInfo._id, email: userInfo.email },
            process.env.JWT_SECRET, 
            {expiresIn: '1h'}
          );
        }
      } catch (error) {
        let err = new Error('Error logging in user') as CustomError;
        err.status = 500;
    
        return next(err);
      }

      console.log('User login successful');
      // Send the response to the client
      res.status(200).json({
        message: 'User login successful',
        token: token,
        userId: userInfo._id,
        userEmail: userInfo.email
      });
  
    } catch (error) {
      const err = error as CustomError;
      err.status = 401;
      err.local = 'loginUser function';

      next(error);
    }
  } else {    
    let err = new Error('All fields are required') as CustomError;
    err.status = 401;
    err.local = 'loginUser function';

    return next(err);
  }
};

export const logoutUser: expressMiddleware = async (req, res, next) => {
  res.status(200).json('User logged out');
};