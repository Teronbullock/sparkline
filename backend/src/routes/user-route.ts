import { Router } from 'express';

const userRouter = Router();
import { 
  getUser,
  addUser,
  loginUser,
  logoutUser
} from '../controllers/user-controller.js';

userRouter.route('/').get(getUser);
userRouter.route('/add').post(addUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logoutUser);

export { userRouter };