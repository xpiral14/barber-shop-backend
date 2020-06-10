import Company from "../models/Company";
import { SUCCESS, CREATED, NO_CONTENT } from "../constants/HttpStatusCod";
import NotFound from "../errors/NotFound";
import hashPassword from "../utils/hashPassword";

export default class CompanyController {
  static async show(req, res, next) {
    try {
      const company = await Company.findByPk(req.companyId);
      return res.status(SUCCESS).json(company);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req, res, next) {
    try {
      // req.data.passwordHash = await hashPassword(req.data.password)
      const company = await Company.create(req.data);
      return res.status(CREATED).json(company);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      let company = await Company.findByPk(req.companyId);

      if (!company) throw new NotFound();
      await company.update(req.data);

      await company.reload();

      return res.status(200).json(company);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      
      const company = await Company.findByPk(req.companyId);


      if (!company) throw new NotFound();

      await company.destroy();

      return res.status(NO_CONTENT).json();
    } catch (error) {
      return next(error);
    }
  }
}
