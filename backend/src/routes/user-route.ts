import { Router } from 'express';

const userRouter = Router();
import { 
  getUser,
  addUser,
  loginUser,
  logoutUser
} from '../controllers/user-controller.js';


userRouter.route('/').get(getUser);


// This route is used to add a new user to the database.
userRouter.route('/add').post(addUser);

userRouter.route('/login').post(loginUser);

userRouter.route('/logout').get(logoutUser);

export { userRouter };
