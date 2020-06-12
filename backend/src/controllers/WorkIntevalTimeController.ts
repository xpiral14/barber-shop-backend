import {WorkIntervalTime} from '../models/WorkIntervalTime';
import NotFound from '../errors/NotFound';
import { notfound } from '../constants/messages';
import { Response, Request, NextFunction } from 'express';

export default class WorkIntervalTimeController {
  static async index(req: any, res: any, next: any) {
    try {
      const barberId = req.userId;

      const workIntervals = await WorkIntervalTime.findAll({
        where: {
          barberId,
        },
      });

      return res.json(workIntervals);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const barberId = req.userId;
      const workInterval = await WorkIntervalTime.findByPk(id);

      if (!workInterval) throw new NotFound(notfound('Intervalo de trabalho'));

      return res.json(workInterval);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req: any, res: any, next: any) {
    try {
      const { body } = req;
      const workInterval = await WorkIntervalTime.create(body);

      return res.json(workInterval);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const { body } = req;

      const workInterval = await WorkIntervalTime.findByPk(id);

      if (!workInterval) throw new  NotFound(notfound('Intervalo de trabalho'));

      await workInterval.update(body);

      await workInterval.reload();
      return res.json(workInterval);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req: any, res: any, next: any) {
    try {
      const { id } = req.params;

      const workInterval = await WorkIntervalTime.findByPk(id);

      if (!workInterval) throw new NotFound(notfound('Intervalo de trabalho'));

      await workInterval.destroy();

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}
