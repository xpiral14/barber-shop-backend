import express from "express";
import './database'
class App {
  constructor() {
    this.app = express();
    this.config()
    this.middlewares()
    this.routes()
  }

  config() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  middlewares() {

  }
  routes() {
      this.app.use('/', (req, res, next) => res.json("ok"))
  } 
}

export default new App().app
