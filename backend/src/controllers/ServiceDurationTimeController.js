import ServiceDurationTime from '../models/ServiceDurationTime';
import NotFound from '../errors/NotFound';
import { notfound } from '../constants/messages';

export default class ServiceDurationTimeController {
  static async show(req, res, next) {
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

  static async create(req, res, next) {
    try {
      const { body } = req;
      console.log(body)
      const serviceDurationTime = await
      ServiceDurationTime.create(body);

      return res.json(serviceDurationTime);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      const serviceDurationTime = await ServiceDurationTime.findByPk(id);

      if (!serviceDurationTime) throw NotFound(notfound('Tempo de serviço'));

      await ServiceDurationTime.update(body);

      await serviceDurationTime.reload();
      return res.json(serviceDurationTime);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const serviceDurationTime = await ServiceDurationTime.findByPk(id);

      if (!serviceDurationTime) throw NotFound(notfound('Tempo de serviço'));

      await serviceDurationTime.destroy();

      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  }
}
