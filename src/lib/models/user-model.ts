import { Schema, model, models, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Hash Password Before Saving to Database
UserSchema.pre('save', async function (next) {
  // "this" in this context is the user OBJ from the sign-up form.
  const user = this as IUser;
  console.log('User before save:', user);
  if (!user.isModified('password')) {
    return next();
  }

  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err) {
    console.error('Error hashing password:', err);
    return next(err as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export Model
export default models.User || model<IUser>('User', UserSchema);
