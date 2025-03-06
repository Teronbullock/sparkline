import { Schema, model, models } from 'mongoose';

interface IExercise extends Document {
  username: string;
  description: string;
  duration: number;
  date: Date;
}

const exerciseSchema = new Schema<IExercise>({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

// Use cached model if it exists to avoid overwriting
const Exercise = models.Exercise || model<IExercise>('Exercise', exerciseSchema);

export default Exercise;
