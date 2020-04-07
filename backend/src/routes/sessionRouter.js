import { Router } from "express";
import SessionController from "../controllers/SessionController";
import validate from "../middlewares/validate";
const sessionRouter = Router();

sessionRouter.use(validate(["email", "password"]));
sessionRouter.get("/user", SessionController.authenticateUser);
sessionRouter.get("/company", SessionController.authenticateCompany);


export default sessionRouter;
