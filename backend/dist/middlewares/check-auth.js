import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const result = dotenv.config({ path: 'backend/.env' });
export const checkAuth = (req, res, next) => {
    try {
        if (req.headers.authorization === undefined) {
            throw new Error('Unauthorized');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            throw new Error('Unauthorized');
        }
        if (process.env.JWT_SECRET !== undefined) {
            if (token) {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                req.userData = { userId: decodedToken.userId };
                next();
            }
        }
    }
    catch (error) {
        let err = error;
        err.status = 401;
        return next(err);
    }
};
