import User from '../models/User';
import NotFound from '../errors/NotFound';
import { SUCCESS, CREATED } from '../constants/HttpStatusCod';
import queryParamToSequelizeQuery from '../utils/queryParamsToSequelizeQuery';

export default class UserController {
  static async index(req, res, next) {
    try {
      let condition = req.query
        ? { ...queryParamToSequelizeQuery(req.query), companyId: req.companyId }
        : { companyId: req.companyId };
      let users = await User.findAll({
        where: {
          ...condition,
        },
      });
      if (!users.length) throw new NotFound();
      return res.json(users);
    } catch (error) {
      return next(error);
    }
  }

  static async showClient(req, res, next) {
    try {
      let client = await User.findOneClient({
        where: {
          id: req.params.id,
          companyId: req.companyId,
        },
        include: [],
      });

      if (!client) throw new NotFound();

      return res.status(SUCCESS).json(client);
    } catch (error) {
      return next(error);
    }
  }

  static async showEmployee(req, res, next) {
    try {
      let employee = await User.findOneEmployee({
        where: {
          id: req.params.id,
          companyId: req.companyId,
        },
      });

      if (!employee) throw new NotFound();

      return res.status(SUCCESS).json(employee);
    } catch (error) {
      return next(error);
    }
  }

  static async show(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
          companyId: req.companyId,
        },
      });

      if (!user) throw new NotFound();

      return res.status(SUCCESS).json(user);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const user = await User.create(req.data);
      return res.status(CREATED).json(user);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.id,
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
