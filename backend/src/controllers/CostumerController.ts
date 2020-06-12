import { User } from '../models/User';
import NotFound from '../errors/NotFound';
import { SUCCESS, CREATED, NO_CONTENT } from '../constants/HttpStatusCod';
import { COSTUMER } from '../constants/userTypes';
import { Appointment } from '../models/Appointment';
import { Op, Sequelize } from 'sequelize';
import { Service } from '../models/Service';
import { Request, Response, NextFunction } from 'express';
export default class CostumerController {
  static async getUser(params: any) {
    const user = await User.findOne(params);

    if (!user) throw new NotFound();

    return user;
  }

  static async index(req: any, res: any, next: any) {
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
  static async show(req: any, res: any, next: any) {
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
  static async showByAppointment(req: any, res: any, next: any) {
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

  static async create(req: any, res: any, next: any) {
    try {
      console.log(req.body)
      req.body.userTypeId = COSTUMER;
      if (req.file) {
        req.body.perfilImage = req.file.filename;
      }

      req.userTypeId = COSTUMER;
      const costumer : User= await User.create(req.body);
      
      req.body.phone && costumer.$add("phone", req.body.phone)
      return res.status(CREATED).json(costumer);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: any, res: any, next: any) {
    try {
      let costumer = await CostumerController.getUser({
        where: {
          id: req.params.id,
          userTypeId: COSTUMER,
          companyId: req.companyId,
        },
      });

      await costumer.update(req.body);

      await costumer.reload();

      return res.status(200).json(costumer);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req: any, res: any, next: any) {
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
