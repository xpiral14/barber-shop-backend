import { Router } from 'express';
import BarberController from '../controllers/BarberController';
import validate from '../middlewares/validate';
import authorization from '../middlewares/authorization';
import { BARBER, COSTUMER } from '../constants/userTypes';
import AppointmentController from '../controllers/AppointmentController';
import upload from '../config/multer';
import UserController from '../controllers/UserController';
import UserValidation from '../middlewares/validations/UserValidation';

const barberRouter = Router();

barberRouter.post(
  '/',
  // validate(['userTypeId', 'companyId', 'genderId', 'email', 'password', "name"]),
  upload.single('perfilImage'),
  BarberController.create
);

barberRouter.use(authorization([BARBER, COSTUMER]));
barberRouter.get('/', BarberController.index);
barberRouter.get('/:id', BarberController.show);
barberRouter.get('/:id/appointment', BarberController.showByAppointments);
barberRouter.get('/:id/available-time', BarberController.availableAppointments);
barberRouter.get('/:id/service-duration', BarberController.showByServiceDuration);
barberRouter.get('/:id/work-interval', BarberController.showByWorkIntervalTime);
barberRouter.get('/:id/service', BarberController.showByService);
barberRouter.get('/:id/appointment', BarberController.showByAppointments);

barberRouter.put('/:id', BarberController.update);

barberRouter.post('/:id/costumer', UserValidation.validateBody, BarberController.createCostumer);

barberRouter.delete('/:id', BarberController.delete);

export default barberRouter;
