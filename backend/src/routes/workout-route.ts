import { Router } from 'express';
import {
  getWorkouts,
  addWorkout
} from '../controllers/workout-controller.js';

const workoutRouter = Router();

workoutRouter.route('/').get(getWorkouts);
workoutRouter.route('/add').post(addWorkout);

export { workoutRouter };