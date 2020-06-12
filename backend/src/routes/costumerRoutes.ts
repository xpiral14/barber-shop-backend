import { Router } from 'express';
import authorization from '../middlewares/authorization';
import { COSTUMER, BARBER } from '../constants/userTypes';
import CostumerController from '../controllers/CostumerController';
import upload from '../config/multer';
import UserController from '../controllers/UserController';

const costumerRouter = Router();

costumerRouter.post('/', upload.single('perfilImage'), CostumerController.create);

costumerRouter.use(authorization([COSTUMER, BARBER]));

costumerRouter.get('/', CostumerController.index);
costumerRouter.get('/:id', CostumerController.show);
costumerRouter.get('/:id/appointment', CostumerController.showByAppointment);

costumerRouter.put('/:id/phone', UserController.showByPhones);

costumerRouter.delete('/:id', CostumerController.delete);


export default costumerRouter;
