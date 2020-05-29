import User from '../models/User';
import NotFound from '../errors/NotFound';
import { SUCCESS, CREATED } from '../constants/HttpStatusCod';
import queryParamToSequelizeQuery from '../utils/queryParamsToSequelizeQuery';
import { COSTUMER } from '../constants/userTypes';
import bcrypt from 'bcrypt';
import { SALT } from '../constants/secrets';
export default class CostumerController {
  static async index(req, res, next) {
    try {
      let queryParams = queryParamToSequelizeQuery(req.query);
      let costumers = await User.findAll({
        where: {
          ...queryParams,
          userTypeId: COSTUMER,
        },
      });
      //   if (!users.length) throw new NotFound();
      return res.json(costumers);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      let costumer = await User.findOne({
        where: {
          id: req.params.id,
          userTypeId: COSTUMER,
          companyId: req.companyId,
        },
      });

      if (!costumer) throw new NotFound();

      return res.status(SUCCESS).json(costumer);
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
      let costumer = await User.findOne({
        where: {
          id: req.params.id,
          userTypeId: COSTUMER,
          companyId: req.companyId,
        },
      });

      if (!costumer) throw new NotFound();

      await costumer.update(req.data);

      await costumer.reload();

      return res.status(200).json(costumer);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      let costumer = await User.findOne({
        where: {
          id: req.params.id,
          userTypeId: COSTUMER,
          companyId: req.companyId,
        },
      });

      if (!costumer) throw new NotFound();

      await costumer.destroy();

      return res.status(NO_CONTENT).json();
    } catch (error) {
      return next(error);
    }
  }
}
