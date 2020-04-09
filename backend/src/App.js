import express from 'express';
import './database';
import sessionRouter from './routes/sessionRouter';
import { BAD_REQUEST } from './constants/HttpStatusCod';
import companyRouter from './routes/companyRouter';
import userRouter from './routes/userRoutes';
import userServiceRouter from './routes/userServiceRouter';

class App {
  constructor() {
    this.app = express();
    this.config();
    // this.middlewares();
    this.routes();
    this.handleError();
  }

  config() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  middlewares() {}
  routes() {
    this.app.use('/session', sessionRouter);
    this.app.use('/company', companyRouter);
    this.app.use('/user', userRouter);
    this.app.use('/service', userServiceRouter);
  }

  handleError() {
    this.app.use((err, req, res, next) => {
      // console.log(err.stack);
      let errors;
      let status;
      console.log(err.name);
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
