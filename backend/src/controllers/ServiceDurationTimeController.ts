import {ServiceDurationTime} from '../models/ServiceDurationTime';
import NotFound from '../errors/NotFound';
import { notfound } from '../constants/messages';
import { NextFunction, Response, Request } from 'express';

export default class ServiceDurationTimeController {
  static async show(req: any, res: any, next: any) {
    try {
      const barberId = req.userId;
      const serviceDurationTime = await ServiceDurationTime.findOne({
        where: {
          barberId,
        },
      });

      if (!serviceDurationTime) throw new NotFound(notfound('Tempo de serviço'));

      return res.json(serviceDurationTime);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req: any, res: any, next: any) {
    try {
      const { body } = req;
      const serviceDurationTime = await
      ServiceDurationTime.create(body);

      return res.json(serviceDurationTime);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const { body } = req;

      const serviceDurationTime = await ServiceDurationTime.findByPk(id);

      if (!serviceDurationTime) throw new NotFound(notfound('Tempo de serviço'));

      await serviceDurationTime.update(body);

      await serviceDurationTime.reload();
      return res.json(serviceDurationTime);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req: any, res: any, next: any) {
    try {
      const { id } = req.params;

      const serviceDurationTime = await ServiceDurationTime.findByPk(id);

      if (!serviceDurationTime) throw new NotFound(notfound('Tempo de serviço'));

      await serviceDurationTime.destroy();

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}
