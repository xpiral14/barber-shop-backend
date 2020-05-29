import { Router } from 'express';
import ServiceDurationTimeController from '../controllers/ServiceDurationTimeController';
import authorization from '../middlewares/authorization';
import { BARBER } from '../constants/userTypes';

const serviceDurationTimeRouter = Router();

serviceDurationTimeRouter.use(authorization([BARBER]));
serviceDurationTimeRouter.post('/', ServiceDurationTimeController.create);

export default serviceDurationTimeRouter;
