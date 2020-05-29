import User from '../models/User';
import NotFound from '../errors/NotFound';
import { SUCCESS, CREATED } from '../constants/HttpStatusCod';
import queryParamToSequelizeQuery from '../utils/queryParamsToSequelizeQuery';
import { BARBER } from '../constants/userTypes';
import bcrypt from 'bcrypt';
import { SALT } from '../constants/secrets';
export default class BarberController {
  static async index(req, res, next) {
    try {
      let queryParams = queryParamToSequelizeQuery(req.query);
      let barbers = await User.findAll({
        where: {
          ...queryParams,
          companyId: req.companyId,
          userTypeId: BARBER,
        },
      });
      //   if (!barbers.length) throw new NotFound();
      return res.json(barbers);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      let barber = await User.findOne({
        where: {
          id: req.params.id,
          userTypeId: BARBER,
          companyId: req.companyId,
        },
      });

      if (!barber) throw new NotFound();

      return res.status(SUCCESS).json(barber);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req, res, next) {
    try {
      req.body.userTypeId = BARBER;
      if (req.file) {
        req.body.perfilImage = req.file.filename;
      }
      req.body.passwordHash = await bcrypt.hash(req.body.password, SALT);

      req.userTypeId = BARBER;
      const costumer = await User.create(req.body);
      return res.status(CREATED).json(costumer);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.id,
          userTypeId: BARBER,
          companyId: req.companyId,
        },
      });

      if (!user) throw new NotFound();

      await user.update(req.data);

      await user.reload();

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.id,
          userTypeId: BARBER,
          companyId: req.companyId,
        },
      });

      if (!user) throw new NotFound();

      await user.destroy();

      return res.status(NO_CONTENT).json();
    } catch (error) {
      return next(error);
    }
  }
}
