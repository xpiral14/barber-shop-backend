import { Router } from 'express';
import GenderController from '../controllers/GenderController';

const genderRouter = Router();

genderRouter.get('/', GenderController.index);
genderRouter.get('/:id', GenderController.show);
export default genderRouter;
