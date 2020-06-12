import { object, number, string } from 'yup';
import { BARBER, COSTUMER } from '../../constants/userTypes';
import { requiredField, maxFieldSize, invalidField } from '../../constants/messages';
import { NextFunction, Request, Response } from 'express';

export default class UserValidation {
  static async validateBody(req: any, res: any, next: any) {
    try {
      let body = object().shape({
        userTypeId: number()
          .oneOf([BARBER, COSTUMER], invalidField('Tipo de usuário'))
          .required(requiredField('Tipo de usuário')),
        genderId: number().required(requiredField('gênero')),
        name: string().max(50, maxFieldSize('nome', 50)).required(requiredField('nome')),
        email: string().email(invalidField('email')).required(requiredField('email')),
        phone: string().matches(
          /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
          invalidField('telefone')
        ),
      });
      const validatedBody = await body.validate(req.body, { abortEarly: false, strict: true });
      req.body = validatedBody;
      req.body.companyId = req.companyId;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
