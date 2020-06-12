import { Router } from 'express';
import SessionController from '../controllers/SessionController';
const sessionRouter = Router();

//para  as rotas abaixo é obrigratório  ter a validação dos campos email e senha
// sessionRouter.use();

/**
 * rota: /costumer
 * descrição: Endpoint para autenticar clientes da determinada empresa
 *
 */
sessionRouter.post('/costumer', SessionController.authenticateCostumer);

/**
 * rota: /barber
 * descrição: Endpoint para autenticar barbeiros
 */
sessionRouter.post('/barber', SessionController.authenticateBarber);

/**
 * rota: /barbershop
 * descrição: Endpoint para autenticar barbearias
 */
sessionRouter.post('/company', SessionController.authenticateCompany);

sessionRouter.post('/user', SessionController.authenticateUser);
export default sessionRouter;
