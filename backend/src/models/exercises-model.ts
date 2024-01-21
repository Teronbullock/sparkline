import mongoose from "mongoose";

const { Schema } = mongoose;

const exercisesSchema = new Schema({
  title: { type: String, required: true },
  muscle_group: { type: String, required: true },
  type: { type: String, required: true },
  equipment: { type: String, required: true },
});

export const Exercises = mongoose.model("Exercises", exercisesSchema);