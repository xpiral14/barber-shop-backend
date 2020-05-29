import { Router } from 'express';
import BarberController from '../controllers/BarberController';
import validate from '../middlewares/validate';
import authorization from '../middlewares/authorization';
import { BARBER } from '../constants/userTypes';
import AppointmentController from '../controllers/AppointmentController';

const barberRouter = Router();

barberRouter.post(
  '/',
  validate(['fantasyName', 'logo', 'cnpj', 'email', 'password']),
  BarberController.create
);

barberRouter.use(authorization([BARBER]));
barberRouter.get('/', BarberController.index);

barberRouter.get('/:id', BarberController.show);
barberRouter.put('/:id', BarberController.update);
barberRouter.delete('/:id', BarberController.delete);

barberRouter.get('/:id/appointments', AppointmentController.index);
barberRouter.get('/:id/appointments/:appointmentId', AppointmentController.show);

export default barberRouter;
