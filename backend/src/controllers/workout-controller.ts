import express, {request, response, NextFunction} from 'express';
import { Workout } from '../models/workout-model.js';
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

export const getWorkouts: expressMiddleware = async(req, res, next) => {
  try {
    const workouts = await Workout.find();
    console.log('Workouts.find()');
    res.status(200).json(workouts);
  } catch (error) {
    let err = error as CustomError;
    err.status = 400;
    err.local = 'getWorkouts';

    next(err);
  }
};

export const addWorkout: expressMiddleware = async (req, res, next) => {
  const {
    username,
    description
  } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newWorkout = {
    username: 'test',
    title: 'test',
    description: 'none',
    duration: 0,
    date: new Date(),
  };

  console.log('save: ', newWorkout);
  
  (async ()=> {
    try {

      await Workout.create(newWorkout);
      console.log('Workout created!');
      res.status(200).json('Workout added!');
    } catch (error) {
      let err = error as CustomError;
      err.status = 400;
  
      next(err);
    }
  })();
};
