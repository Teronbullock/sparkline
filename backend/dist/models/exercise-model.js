import mongoose from "mongoose";
const { Schema } = mongoose;
const exercisesSchema = new Schema({
    title: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    exerciseType: { type: String, required: true },
    equipment: { type: String, required: true },
});
export const Exercises = mongoose.model("Exercises", exercisesSchema);
