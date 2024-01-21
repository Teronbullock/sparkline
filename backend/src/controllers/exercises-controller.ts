import express, { Request, Response, NextFunction } from 'express';
import { Exercises } from '../models/exercises-model.js';

interface expressMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}

interface CustomError extends Error {
  status?: number;
  cause?: string;
  local?: string;
}

export const getExercise: expressMiddleware = async (req, res, next) => {
  try {
    const exercises = await Exercises.find();

    if (exercises === null || exercises.length === 0) {
      throw new Error('No exercises found');
    }

    res.status(200).json(exercises);

  } catch (error) {
    let err = error as CustomError;
    err.status = 400;

    next(err);    
  }
}


export const addExercise: expressMiddleware = async (req, res, next) => {

  const { title, muscle_group, equipment, type } = req.body;
  const hasMultiExercises  = req.query.all;

  interface exerciseObjI {
    title?: string,
    muscle_group?: string,
    equipment?: string,
    type?: string
  }

  try {

    if ( hasMultiExercises ) {
      await Exercises.insertMany(req.body);
      console.log('all exercises were added');
      res.status(200).json('all exercises were added');

    } else {
      const exerciseObj: exerciseObjI = {
        title,
        muscle_group,
        equipment,
        type,
      };

      await Exercises.create(exerciseObj);
      console.log('exercise added');
      res.status(200).json('exercise added');
    }

  } catch (error) {
    let err = error as CustomError;
    err.status = 400;

    next(err);
  }

}