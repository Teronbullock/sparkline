import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
}, {
    timestamps: true,
});
userSchema.pre('save', function (next) {
    // "this" in this context is the user OBJ from the sign-up form.
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, 10, (err, hash) => {
        // pass the error to the next middleware function.
        if (err) {
            return next(err);
        }
        // set the user password to the hashed password.
        user.password = hash;
        next();
    });
});
export const User = mongoose.model('User', userSchema);
