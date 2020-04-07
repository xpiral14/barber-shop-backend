import User from "../models/User";
import { EMPLOYEE } from "../constants/userTypes";
import NotFound from "../errors/NotFound";
import { SUCCESS, CREATED } from "../constants/HttpStatusCod";

export default class UserController {
  static async index(req, res, next) {
    try {
      let users = await User.findAll({
        where: {
          companyId: req.companyId,
        },
      });

      return res.json(users);
    } catch (error) {
      return next(error);
    }
  }

  static async showClient(req, res, next) {
    try {
      let client = await User.findAll({
        where: {
          id: req.params.id,
          companyId: req.companyId,
          userTypeId: EMPLOYEE,
        },
      });

      if (!client) throw new NotFound();

      return res.status(SUCCESS).json(client);
    } catch (error) {
      return next(error);
    }
  }

  static async showEmployee(req, res, next) {
    try {
      let employee = await User.findAll({
        where: {
          id: req.params.id,
          companyId: req.companyId,
          userTypeId: EMPLOYEE,
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
