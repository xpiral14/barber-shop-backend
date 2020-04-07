import express from "express";
import "./database";
import Company from "./models/Company";
import CompanyAddress from "./models/CompanyAddress";
import sessionRouter from "./routes/sessionRouter";
import bcrypt from "bcrypt";
import { SALT } from "./constants/secrets";
import { BAD_REQUEST } from "./constants/HttpErrors";
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
    this.app.use("/session", sessionRouter);
  }

  handleError() {
    this.app.use((err, req, res, next) => {
      let errors;
      let status;
      switch (err.name) {
        case "ValidationError":
          errors = err.errors;
          status = BAD_REQUEST;
          break;
        default:
          errors = [err.message];
          status = err.status || 500;
          break;
      }
      return res.status(status).json(errors);
    });
  }
}

export default new App().app;
