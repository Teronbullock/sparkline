import { Router } from "express";

const exercisesRouter = Router();
import { addExercise, getExercise } from "../controllers/exercises-controller.js";

exercisesRouter.route('/').get(getExercise);
exercisesRouter.route('/add').post(addExercise);

export { exercisesRouter };