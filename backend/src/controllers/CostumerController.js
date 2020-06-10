import User from '../models/User';
import NotFound from '../errors/NotFound';
import { SUCCESS, CREATED } from '../constants/HttpStatusCod';
import queryParamToSequelizeQuery from '../utils/queryParamsToSequelizeQuery';
import { COSTUMER } from '../constants/userTypes';
import bcrypt from 'bcrypt';
import { SALT } from '../constants/secrets';
import Appointment from '../models/Appointment';
import { Op, Sequelize } from 'sequelize';
import Service from '../models/Service';
export default class CostumerController {
  static async getUser(params) {
    const user = await User.findOne(params);

    if (!user) throw new NotFound();

    return user;
  }

  static async index(req, res, next) {
    try {
      let costumers = await User.findAll({
        where: {
          userTypeId: COSTUMER,
          companyId: req.companyId,
        },
      });
      return res.json(costumers);
    } catch (error) {
      return next(error);
    }
  }
  static async show(req, res, next) {
    try {
      let costumer = await CostumerController.getUser({
        where: {
          id: req.params.id,
          userTypeId: COSTUMER,
          companyId: req.companyId,
        },
      });
      return res.status(SUCCESS).json(costumer);
    } catch (error) {
      return next(error);
    }
  }
  static async showByAppointment(req, res, next) {
    const { from, to } = req.query;
    try {
      let costumer = await CostumerController.getUser({
        where: {
          id: req.params.id,
          userTypeId: COSTUMER,
          companyId: req.companyId,
        },
        include: {
          model: Appointment,
          as: 'costumerAppointments',
          where: {
            [Op.and]: Sequelize.literal(
              `date(\`date\`) >= '${from}' and date(\`date\`) <= '${to}'`
            ),
          },
          include: [
            { model: User, as: 'barber' },
            { model: Service, as: 'service' },
          ],
        },
      });

      return res.status(SUCCESS).json(costumer.costumerAppointments);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req, res, next) {
    try {
      req.body.userTypeId = COSTUMER;
      if (req.file) {
        req.body.perfilImage = req.file.filename;
      }
      req.body.passwordHash = await bcrypt.hash(req.body.password, SALT);

      req.userTypeId = COSTUMER;
      const costumer = await User.create(req.body);
      return res.status(CREATED).json(costumer);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      let costumer = await CostumerController.getUser({
        where: {
          id: req.params.id,
          userTypeId: COSTUMER,
          companyId: req.companyId,
        },
      });

      await costumer.update(req.data);

      await costumer.reload();

      return res.status(200).json(costumer);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      let costumer = await CostumerController.getUser({
        where: {
          id: req.params.id,
          userTypeId: COSTUMER,
          companyId: req.companyId,
        },
      });
      await costumer.destroy();

      return res.status(NO_CONTENT).json();
    } catch (error) {
      return next(error);
    }
  }
}
