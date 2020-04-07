import jwt from "jsonwebtoken";
import InvalidToken from "../errors/InvalidToken";
import getToken from "../utils/getToken";
import { SECRET } from "../constants/secrets";
import User from "../models/User";
import NotFound from "../errors/NotFound";
import { notfound, invalidField, requiredField } from "../constants/messages";
import bcrypt from "bcrypt";
import BadRequest from "../errors/BadRequest";
import { EXPIRES_IN } from "../constants/times";
import { SUCCESS } from "../constants/HttpErrors";
import { object, string } from "yup";
import Company from "../models/Company";

export default class SessionController {
  static async authenticateUser(req, res, next) {
    try {
      let schema = object().shape({
        email: string()
          .email(invalidField("email", "M"))
          .required(requiredField("email")),
        password: string().required(requiredField("senha")),
      });

      await schema.validate(req.body, { abortEarly: false });

      let { email, password } = req.body;
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) throw new NotFound(notfound("Usuário"));

      const isValidPassword = await bcrypt.compare(password, user.passwordHash);

      if (!isValidPassword) throw new BadRequest(invalidField("Senha", "F"));

      let payload = {
        id: user.id,
        level: user.userTypeId,
      };
      const token = jwt.sign(payload, SECRET, {
        expiresIn: EXPIRES_IN,
        algorithm: "HS512",
      });

      return res.status(SUCCESS).json(token);
    } catch (error) {
      next(error);
    }
  }

  static async authenticateCompany(req, res, next) {
    try {
      let schema = object().shape({
        email: string()
          .email(invalidField("email", "M"))
          .required(requiredField("email")),
        password: string().required(requiredField("senha")),
      });

      await schema.validate(req.body, { abortEarly: false });

      let { email, password } = req.body;
      let company = await Company.findOne({
        where: {
          email,
        },
      });
      if (!company) throw new NotFound(notfound("Usuário"));

      const isValidPassword = await bcrypt.compare(
        password,
        company.passwordHash
      );

      if (!isValidPassword) throw new BadRequest(invalidField("Senha", "F"));

      let payload = {
        id: company.id,
        level: 0,
      };
      const token = jwt.sign(payload, SECRET, {
        expiresIn: EXPIRES_IN,
        algorithm: "HS512",
      });

      return res.status(SUCCESS).json(token);
    } catch (error) {
      next(error);
    }
  }
}
