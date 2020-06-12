import { Router } from "express";
import CompanyController from "../controllers/CompanyController";
import authorization from "../middlewares/authorization";

const companyRouter = Router();

companyRouter.post(
  "/",
  CompanyController.create
);

companyRouter.use(authorization([0]));

companyRouter.get("/", CompanyController.show);
companyRouter.put("/", CompanyController.update);
companyRouter.delete("/", CompanyController.delete);

export default companyRouter;
