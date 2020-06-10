import { object, number, string } from 'yup';
import { BARBER, COSTUMER } from '../../constants/userTypes';
import { requiredField, maxFieldSize, invalidField } from '../../constants/messages';

export default class UserValidation {
  static async validateBody(req, res, next) {
    try {
      let body = object().shape({
        userTypeId: number()
          .oneOf([BARBER, COSTUMER], invalidField('Tipo de usuário'))
          .required(requiredField('Tipo de usuário')),
        genderId: number().required(requiredField('gênero')),
        name: string().max(50, maxFieldSize('nome')).required(requiredField('nome')),
        email: string().email(invalidField('email')).required(requiredField('email')),
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
