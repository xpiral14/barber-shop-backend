import { Router } from 'express';
import ServiceController from '../controllers/ServiceController';
import authorization from '../middlewares/authorization';

const serviceRouter = Router();
serviceRouter.use(authorization());
serviceRouter.get('/', ServiceController.index);
serviceRouter.get('/:id/barber', ServiceController.showBarberServices);
serviceRouter.get('/:id', ServiceController.show);

export default serviceRouter;
