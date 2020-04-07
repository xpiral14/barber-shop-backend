import { Router } from "express";
import CompanyController from "../controllers/CompanyController";
import validate from "../middlewares/validate";
import authorization from "../middlewares/authorization";

const companyRouter = Router();

companyRouter.post(
  "/",
  validate(["fantasyName", "logo", "cnpj", "email", "password"]),
  CompanyController.create
);

companyRouter.use(authorization([0]));

companyRouter.get("/", CompanyController.show);
companyRouter.put("/", validate(["fantasyName", "logo", "cnpj", "email"]), CompanyController.update);
companyRouter.delete("/", CompanyController.delete);

export default companyRouter;
