import { Router } from 'express';
import validate from '../middlewares/validate';
import authorization from '../middlewares/authorization';
import { COSTUMER } from '../constants/userTypes';
import AppointmentController from '../controllers/AppointmentController';
import CostumerController from '../controllers/CostumerController';
import upload from '../config/multer';

const costumerRouter = Router();

costumerRouter.post("/",
  upload.single("perfilImage"),
  CostumerController.create
);
costumerRouter.get('/', CostumerController.index);

costumerRouter.use(authorization([COSTUMER]));

costumerRouter.get('/:id', CostumerController.show);
costumerRouter.put('/:id', CostumerController.update);
costumerRouter.delete('/:id', CostumerController.delete);

costumerRouter.get('/:id/appointments', AppointmentController.index);
costumerRouter.get('/:id/appointments/:appointmentId', AppointmentController.show);

export default costumerRouter;
