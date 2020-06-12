import getToken from '../utils/getToken';
import jwt, { Secret } from 'jsonwebtoken';

import { SECRET } from '../constants/secrets';
import Unauthorized from '../errors/Unauthorized';
import { COSTUMER, BARBER } from '../constants/userTypes';
import { Request, Response, NextFunction } from 'express';
interface Payload {
  level: number;
  id: number;
  companyId: number;
}
export default function authorization(levels = [COSTUMER, BARBER]) {
  return async (req: any, res: any, next: any) => {
    try {

      const token = getToken(req.headers.authorization);
      const payload = jwt.verify(token, SECRET) as Payload;

      if (!levels.includes(payload.level)) throw new Unauthorized();

      req.userId = payload.id ;

      req.companyId = payload.companyId;

      return next();

    } catch (error) {
      return next(error);
    }
  };
}
