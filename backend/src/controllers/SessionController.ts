import jwt from 'jsonwebtoken';
import InvalidToken from '../errors/InvalidToken';
import getToken from '../utils/getToken';
import { SECRET } from '../constants/secrets';
import {User} from '../models/User';
import NotFound from '../errors/NotFound';
import { notfound, invalidField, requiredField } from '../constants/messages';
import BadRequest from '../errors/BadRequest';
import { EXPIRES_IN } from '../constants/times';
import { SUCCESS } from '../constants/HttpStatusCod';
import {Company} from '../models/Company';
import { BARBER, COSTUMER } from '../constants/userTypes';
import {UserType} from '../models/UserType';
import { Request, Response, NextFunction } from 'express';
import bcrypt  from 'bcrypt'

export default class SessionController {
  static async authenticateBarber(req: any, res: any, next: any) {
    try {
      let { email, password } = req.body;
      let barber = await User.findOne({
        where: {
          email,
          userTypeId: BARBER,
        },
        attributes: [
          'email',
          'passwordHash',
          'id',
          'name',
          'userTypeId',
          'companyId',
          'perfilImage',
          'perfilImageURL',
        ],
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

      const token = jwt.sign(payload, SECRET , {
        expiresIn: EXPIRES_IN,
        algorithm: "HS256",
      });

      return res.status(SUCCESS).json({ token, user: barber });
    } catch (error) {
      next(error);
    }
  }

  static async authenticateCostumer(req: any, res: any, next: any) {
    try {
      let { email, password } = req.body;
      let costumer = await User.findOne({
        where: {
          email,
          userTypeId: COSTUMER,
        },
        attributes: ['email', 'passwordHash', 'id', 'name', 'userTypeId', 'companyId'],
        include: [{ model: Company, as: 'company' }],
      });
      if (!costumer) throw new NotFound(notfound('cliente'));

      const isValidPassword = await bcrypt.compare(password, costumer.passwordHash);

      if (!isValidPassword) throw new BadRequest(invalidField('Senha', 'F'));
      let payload = {
        id: costumer.id,
        level: costumer.userTypeId,
        companyId: costumer.companyId,
      };

      const token = jwt.sign(payload, SECRET , {
        expiresIn: EXPIRES_IN,
        algorithm: 'HS256',
      });

      return res.status(SUCCESS).json({ token, user: costumer });
    } catch (error) {
      next(error);
    }
  }
  static async authenticateUser(req: any, res: any, next: any) {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({
        where: {
          email,
        },
        attributes: ['email', 'passwordHash', 'id', 'name', 'userTypeId', 'companyId', "perfilImage", "perfilImageURL"],
        include: [
          { model: Company, as: 'company' },
          { model: UserType, as: 'userType' },
        ],
      });
      if (!user) if (!user) throw new NotFound(notfound('cliente'));

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);

      if (!isValidPassword) throw new BadRequest(invalidField('Senha', 'F'));
      let payload = {
        id: user.id,
        level: user.userTypeId,
        companyId: user.companyId,
      };

      const token = jwt.sign(payload, SECRET , {
        expiresIn: EXPIRES_IN,
        algorithm: 'HS256',
      });

      return res.status(SUCCESS).json({ token, user });
    } catch (error) {
      next(error);
    }
  }
  static async authenticateCompany(req: any, res: any, next: any) {
    try {
      let { email, password } = req.body;
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
      const token = jwt.sign(payload, SECRET , {
        expiresIn: EXPIRES_IN,
        algorithm: 'HS512',
      });

      return res.status(SUCCESS).json(token);
    } catch (error) {
      next(error);
    }
  }
}
