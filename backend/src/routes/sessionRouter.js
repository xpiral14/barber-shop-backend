import { Router } from "express";
import SessionController from '../controllers/SessionController'
const sessionRouter = Router()


sessionRouter.get('/user', SessionController.authenticateUser)
sessionRouter.get('/company', SessionController.authenticateCompany)
export default sessionRouter;