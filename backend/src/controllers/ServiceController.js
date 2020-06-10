import Service from '../models/Service';
import User from '../models/User';

export default class ServiceController {
  static async index(req, res, next) {
    const services = await Service.findAll({
      where: {
        companyId: req.companyId,
      },
    });

    return res.json(services);
  }

  static async show(req, res, next) {
    const service = await Service.findOne({
      where: {
        id: req.params.id,
        companyId: req.companyId,
      },
      include: [{ model: User, as: 'barbers' }],
    });
    return res.json(service);
  }

  static async showBarberServices(req, res, next) {
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
  static async create(req, res, next) {}

  static async update(req, res, next) {}

  static async delete(req, res, next) {}
}
