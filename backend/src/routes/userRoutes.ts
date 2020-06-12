import { Router } from 'express';
import UserController from '../controllers/UserController';
import authorization from '../middlewares/authorization';
import SessionController from '../controllers/SessionController';

const userRouter = Router();

userRouter.post('/sign-in', SessionController.authenticateUser);
userRouter.use(authorization());
userRouter.get('/:id/company', UserController.showByCompany);
userRouter.get('/:id/phone', UserController.showByPhones);
userRouter.get('/:id/gender', UserController.showByGender);

userRouter.get('/profile', UserController.show);

export default userRouter;
