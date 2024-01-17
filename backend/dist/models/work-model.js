import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    totalweightlifted: { type: Number, required: false },
    exercises: { type: Array, required: true }
}, {
    timestamps: true,
});
export const Workout = mongoose.model('Workouts', workoutSchema);
