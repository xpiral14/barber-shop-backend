import UserService from '../models/UserService';
import Company from '../models/Company';
import User from '../models/User';
import NotFound from '../errors/NotFound';
import { notfound, notExists, exists } from '../constants/messages';
import BadRequest from '../errors/BadRequest';
import { EMPLOYEE, CLIENT } from '../constants/userTypes';
import Notification from '../schemas/Notification';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export default class UserServiceController {
  static async index(req, res, next) {
    try {
      let userServices = await UserService.findAll({
        where: {
          companyId: req.companyId,
        },
        include: [
          { model: Company, as: 'company' },
          { model: User, as: 'client', foreignKey: 'clientId' },
          { model: User, as: 'employee', foreignKey: 'employeeId' },
        ],
      });

      if (!userServices) throw new NotFound(notfound('trabalhos'));

      return res.json(userServices);
    } catch (error) {
      return next(erro);
    }
  }

  static async show(req, res, next) {
    try {
      let userService = await UserService.findOne({
        where: {
          id: req.params.id,
          companyId: req.companyId,
        },
        include: [
          { model: Company, as: 'company' },
          { model: User, as: 'client', foreignKey: 'clientId' },
          { model: User, as: 'employee', foreignKey: 'employeeId' },
        ],
      });

      if (!userService) throw new NotFound();

      return res.json(userService);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req, res, next) {
    try {
      req.data.companyId = req.companyId;

      const existsClient = await User.findOne({
        where: {
          id: req.data.clientId,
          companyId: req.data.companyId,
          userTypeId: CLIENT,
        },
      });

      if (!existsClient) throw new BadRequest(notExists('cliente'));

      const existsEmployee = await User.findOne({
        where: {
          id: req.data.employeeId,
          companyId: req.data.companyId,
          userTypeId: EMPLOYEE,
        },
      });

      if (!existsEmployee) throw new BadRequest(notExists('barbeiro'));

      let existsService = await UserService.findOne({
        where: {
          appointment: req.data.appointment,
        },
      });
      if (existsService) throw new BadRequest('horário já oculpado');
      const userService = await UserService.create(req.data);

      const userServiceData = await UserService.findByPk(userService.id, {
        include: [
          {
            model: User,
            as: 'client',
          },
          {
            model: User,
            as: 'employee',
          },
        ],
      });
      console.log(userServiceData.appointment);
      let notificationContent = `Novo agendamento de ${userServiceData.client.name} para o dia ${format(
        userServiceData.appointment,
        "dd 'de' MMMM 'às' HH:mm",
        {
          locale: ptBR,
        }
      )}`;

      await Notification.create({
        content: notificationContent,
        user: req.data.employeeId,
      });

      return res.json(userServiceData);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {}

  static async delete(req, res, next) {}
}
