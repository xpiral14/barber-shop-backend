import User from '../models/User';
import NotFound from '../errors/NotFound';
import { SUCCESS, CREATED } from '../constants/HttpStatusCod';
import queryParamToSequelizeQuery from '../utils/queryParamsToSequelizeQuery';
import Company from '../models/Company';
import Gender from '../models/Gender';
import UserPhone from '../models/UserPhone';

export default class UserController {
  static async getUser(params) {
    const user = await User.findOne(params);

    if (!user) throw new NotFound('Usuário');

    return user;
  }
  static async show(req, res, next) {
    const user = await User.findByPk(req.userId);

    return res.json(user);
  }

  static async index(req, res, next) {
    try {
      let queryParams = queryParamToSequelizeQuery(req.query);
      let barbers = await User.findAll({
        where: {
          ...queryParams,
          companyId: req.companyId,
        },
      });
      //   if (!barbers.length) throw new NotFound();
      return res.json(barbers);
    } catch (error) {
      return next(error);
    }
  }

  static async showByCompany(req, res, next) {
    try {
      const user = await UserController.getUser({
        where: {
          id: req.params.id,
        },
        include: [{ model: Company, as: 'company' }],
      });
      return res.json(user.company);
    } catch (error) {
      return next(error);
    }
  }

  static async showByGender(req, res, next) {
    try {
      const user = await UserController.getUser({
        where: {
          id: req.params.id,
        },
        include: [{ model: Gender, as: 'gender' }],
      });
      return res.json(user.gender);
    } catch (error) {
      return next(error);
    }
  }

  static async showByPhones(req, res, next) {
    try {
      const user = await UserController.getUser({
        where: {
          id: req.params.id,
        },
        include: [{ model: UserPhone, as: 'phones' }],
      });
      return res.json(user.phones);
    } catch (error) {
      return next(error);
    }
  }
}
