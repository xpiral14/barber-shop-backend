import { Router } from 'express';
import UserServiceController from '../controllers/UserServiceController';
import validate from '../middlewares/validate';
import authorization from '../middlewares/authorization';
const userServiceRouter = Router();

userServiceRouter.use(authorization([0]));
userServiceRouter.get('/', UserServiceController.index);
userServiceRouter.get('/:id', UserServiceController.show);
userServiceRouter.post('/', validate(['clientId', 'employeeId', "appointment"]), UserServiceController.create);

export default userServiceRouter;
