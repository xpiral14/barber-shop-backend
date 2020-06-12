import { number, string, object } from "yup";
import { maxFieldSize, requiredField, invalidField } from "../../constants/messages";
import { Request, Response, NextFunction } from "express";
import BadRequest from "../../errors/BadRequest";

export default class AppointmentValidation {
  static validateParams(params = []) {
    const validators = {
      id: string().matches(/\d/, invalidField('id')).required(requiredField('id')),
    };
    const validateObject = object().shape(validators);

    return async (req: any, res: any, next: any) => {
      try {
        const validated = await validateObject.validate(req.params, { abortEarly: false });
        req.params = validated;
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static validateBody() {
    const bodyAtttributes = {
      initialTime: number()
        .positive()
        .max(1440, maxFieldSize('Tempo inicial', 1440))
        .required(requiredField('Tempo Inicial')),
      finishTime: number()
        .positive()
        .max(1440, maxFieldSize('Tempo inicial', 1440))
        .required(requiredField('Tempo final')),
    };

    const validateObject = object().shape(bodyAtttributes);

    return async (req: any, res: any, next: any) => {
      try {
        const validatedBody = await validateObject.validate(req.body, { abortEarly: false });

        if (!!validatedBody && validatedBody.initialTime > validatedBody.finishTime)
          throw new BadRequest('O tempo inicial não pode ser maior que o tempo final');

        req.body = validatedBody;
        req.body.barberId = req.userId;
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
