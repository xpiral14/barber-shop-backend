import {Service} from '../models/Service';
import {User} from '../models/User';
import { Request, Response, NextFunction } from 'express';

export default class ServiceController {
  static async index(req: any, res: any, next: any) {
    const services = await Service.findAll({
      where: {
        companyId: req.companyId,
      },
    });

    return res.json(services);
  }

  static async show(req: any, res: any, next: any) {
    const service = await Service.findOne({
      where: {
        id: req.params.id,
        companyId: req.companyId,
      },
      include: [{ model: User, as: 'barbers' }],
    });
    return res.json(service);
  }

  static async showBarberServices(req: any, res: any, next: any) {
    const services = await Service.findOne({
      where: {
        id: req.params.id,
        companyId: req.companyId,
      },
      attributes: ['id'],
      include: [{ model: User, as: 'barbers' }],
    });

    return res.json(services.barbers);
  }
  static async create(req: any, res: any, next: any) {}

  static async update(req: any, res: any, next: any) {}

  static async delete(req: any, res: any, next: any) {}
}
