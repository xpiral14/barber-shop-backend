import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';
import { BARBER, COSTUMER } from '../constants/userTypes';
import authorization from '../middlewares/authorization';

const appointmentRouter = Router();

appointmentRouter.use(authorization([BARBER, COSTUMER]));
appointmentRouter.get('/', AppointmentController.index);

appointmentRouter.get('/:barberId/available', AppointmentController.availableAppointments);

export default appointmentRouter;
