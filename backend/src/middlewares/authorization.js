import getToken from '../utils/getToken';
import jwt from 'jsonwebtoken';

import { SECRET } from '../constants/secrets';
import Unauthorized from '../errors/Unauthorized';
import { COSTUMER, BARBER } from '../constants/userTypes';
export default function authorization(levels = [COSTUMER, BARBER]) {
  return async (req, res, next) => {
    try {
      const token = getToken(req.headers.authorization);
      const payload = jwt.verify(token, SECRET, {
        algorithms: 'HS512',
      });
      if (!levels.includes(payload.level)) throw new Unauthorized();
      req.userId = payload.level !== 0 && payload.id;
      req.companyId = payload.companyId;
      return next();
    } catch (error) {
      return next(error);
    }
  };
}
