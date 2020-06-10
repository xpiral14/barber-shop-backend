import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';
import { BARBER, COSTUMER } from '../constants/userTypes';
import authorization from '../middlewares/authorization';

const appointmentRouter = Router();

appointmentRouter.use(authorization([BARBER, COSTUMER]));
appointmentRouter.get('/', AppointmentController.index);
appointmentRouter.get('/:id', AppointmentController.show);
appointmentRouter.get('/:id/barber', AppointmentController.showByBarber);
appointmentRouter.get('/:id/costumer', AppointmentController.showByCostumer);
appointmentRouter.get('/:id/service', AppointmentController.showByService);

appointmentRouter.put('/:id', AppointmentController.update);

appointmentRouter.post('/', AppointmentController.create);
appointmentRouter.post('/:id/cancel', AppointmentController.cancel);
export default appointmentRouter;
