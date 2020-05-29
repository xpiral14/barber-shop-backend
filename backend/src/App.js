import express from 'express';
import './database';
import sessionRouter from './routes/sessionRouter';
import { BAD_REQUEST } from './constants/HttpStatusCod';
import companyRouter from './routes/companyRouter';
import userRouter from './routes/userRoutes';
import barberRouter from './routes/barberRoutes';
import cors from 'cors';
import helmet from 'helmet';
import costumerRouter from './routes/costumerRoutes';

import { resolve } from 'path';
import workIntervalTimeRouter from './routes/workIntervalTimeRouter';
import appointmentRouter from './routes/appointmentsRoutes';
import serviceDurationTimeRouter from './routes/serviceDurationTimeRoutes';
class App {
  constructor() {
    this.app = express();
    this.config();
    // this.middlewares();
    this.routes();
    this.handleError();
  }

  config() {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors({ origin: 'http://localhost:3000' }));
  }
  middlewares() {}
  routes() {
    this.app.use('/static/perfil', express.static(resolve('tmp', 'perfil_images')));
    this.app.use('/session', sessionRouter);
    this.app.use('/company', companyRouter);
    this.app.use('/user', userRouter);
    this.app.use('/barber', barberRouter);
    this.app.use('/costumer', costumerRouter);
    this.app.use('/work-interval', workIntervalTimeRouter);
    this.app.use('/appointment', appointmentRouter);
    this.app.use('/service-duration', serviceDurationTimeRouter);
  }

  handleError() {
    this.app.use((err, req, res, next) => {
      // console.log(err.stack);
      let errors;
      let status;
      console.log(err);
      switch (err.name) {
        case 'ValidationError':
          errors = err.errors;
          status = BAD_REQUEST;
          break;
        case 'SequelizeValidationError': {
          status = BAD_REQUEST;
          errors = err.message.replace(/Validation error: /g, '').split(',\n');
          break;
        }
        case 'TokenExpiredError': {
          status = BAD_REQUEST;
          errors = ['O token de acesso expirou'];
          break;
        }
        default:
          errors = err.message && [err.message];
          status = err.status || 500;
          break;
      }
      return res.status(status).json(errors);
    });
  }
}

export default new App().app;
