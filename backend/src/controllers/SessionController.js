import jwt from 'jsonwebtoken';
import InvalidToken from '../errors/InvalidToken';
import getToken from '../utils/getToken';
import { SECRET } from '../constants/secrets';
import User from '../models/User';
import NotFound from '../errors/NotFound';
import { notfound, invalidField, requiredField } from '../constants/messages';
import bcrypt from 'bcrypt';
import BadRequest from '../errors/BadRequest';
import { EXPIRES_IN } from '../constants/times';
import { SUCCESS } from '../constants/HttpStatusCod';
import { object, string } from 'yup';
import Company from '../models/Company';
import { BARBER, COSTUMER } from '../constants/userTypes';

export default class SessionController {
  static async authenticateBarber(req, res, next) {
    try {
      let { email, password } = req.data;
      let barber = await User.findOne({
        where: {
          email,
          userTypeId: BARBER,
        },
        attributes: ['email', 'passwordHash', 'id', 'name', 'userTypeId', 'companyId'],
        include: [{ model: Company, as: 'company' }],
      });
      if (!barber) if (!barber) throw new NotFound(notfound('Barbeiro'));

      const isValidPassword = await bcrypt.compare(password, barber.passwordHash);

      if (!isValidPassword) throw new BadRequest(invalidField('Senha', 'F'));

      let payload = {
        id: barber.id,
        level: barber.userTypeId,
        companyId: barber.companyId,
      };

      const token = jwt.sign(payload, SECRET, {
        expiresIn: EXPIRES_IN,
        algorithm: 'HS512',
      });

      return res.status(SUCCESS).json({ token, barber });
    } catch (error) {
      next(error);
    }
  }

  static async authenticateCostumer(req, res, next) {
    try {
      let { email, password } = req.data;
      let costumer = await User.findOne({
        where: {
          email,
          userTypeId: COSTUMER,
        },
        attributes: ['email', 'passwordHash', 'id', 'name', 'userTypeId', 'companyId'],
        include: [{ model: Company, as: 'company' }],
      });
      if (!costumer) if (!costumer) throw new NotFound(notfound('cliente'));

      const isValidPassword = await bcrypt.compare(password, costumer.passwordHash);

      if (!isValidPassword) throw new BadRequest(invalidField('Senha', 'F'));
      let payload = {
        id: costumer.id,
        level: costumer.userTypeId,
        companyId: costumer.companyId,
      };

      const token = jwt.sign(payload, SECRET, {
        expiresIn: EXPIRES_IN,
        algorithm: 'HS512',
      });

      return res.status(SUCCESS).json({ token, costumer });
    } catch (error) {
      next(error);
    }
  }

  static async authenticateCompany(req, res, next) {
    try {
      let { email, password } = req.data;
      let company = await Company.findOne({
        where: {
          email,
        },
        attributes: ['email', 'passwordHash', 'id'],
      });
      if (!company) throw new NotFound(notfound('Barbearia'));

      const isValidPassword = await bcrypt.compare(password, company.passwordHash);

      if (!isValidPassword) throw new BadRequest(invalidField('Senha', 'F'));

      let payload = {
        id: company.id,
        level: 0,
      };
      const token = jwt.sign(payload, SECRET, {
        expiresIn: EXPIRES_IN,
        algorithm: 'HS512',
      });

      return res.status(SUCCESS).json(token);
    } catch (error) {
      next(error);
    }
  }
}
