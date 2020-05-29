import { Router } from 'express';
import WorkIntervalTimeController from '../controllers/WorkIntevalTimeController';
import authorization from '../middlewares/authorization';
import { BARBER } from '../constants/userTypes';
import WorkIntervalValidation from '../middlewares/validations/WorkIntervalValidation';

const workIntervalTimeRouter = Router();

workIntervalTimeRouter.use(authorization([BARBER]));
workIntervalTimeRouter.get('/', WorkIntervalTimeController.index);
workIntervalTimeRouter.get('/:id', WorkIntervalValidation.validateParams(["id"]), WorkIntervalTimeController.show);
workIntervalTimeRouter.post('/', WorkIntervalValidation.validateBody(), WorkIntervalTimeController.create);
workIntervalTimeRouter.put('/', WorkIntervalTimeController.update);
workIntervalTimeRouter.delete('/:id', WorkIntervalTimeController.delete);

export default workIntervalTimeRouter;
