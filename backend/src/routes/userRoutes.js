import { Router } from "express";
import UserController from "../controllers/UserController";
import validate from "../middlewares/validate";
import authorization from "../middlewares/authorization";

const userRouter = Router();

userRouter.use(authorization())
userRouter.post(
  "/",
  validate([
    "companyId",
    "userTypeId",
    "genderId",
    "name",
    "email",
    "password",
    "userTypeId"
  ]),
  UserController.create
);

userRouter.get("/", UserController.index);

userRouter.get("/client/:id", UserController.showClient)

userRouter.get("/employee/:id", UserController.showEmployee)


userRouter.put(
  "/",
  validate(["genderId", "name", "email"]),
  UserController.update
);

userRouter.delete("/", UserController.delete);

export default userRouter;
