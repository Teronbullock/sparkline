import { Exercise } from '../models/exercise.js';
export const getExercise = async (req, res, next) => {
    try {
        const exercises = await Exercise.find();
        if (exercises === null || exercises.length === 0) {
            throw new Error('No exercises found');
        }
        res.status(200).json(exercises);
    }
    catch (error) {
        let err = error;
        err.status = 400;
        next(err);
    }
};
