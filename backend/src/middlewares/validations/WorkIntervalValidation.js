import { string, object, number } from 'yup';
import { requiredField, invalidField, maxFieldSize } from '../../constants/messages';
import BadRequest from '../../errors/BadRequest';

export default class WorkIntervalValidation {
  static validateParams(params = []) {
    const validators = {
      id: string().matches(/\d/, invalidField('id')).required(requiredField('id')),
    };

    //de acordo com os parametros solicitados para a validação filtra os parametros que existem para validá-los.
    const paramsToValidate = params.reduce(
      (p, c) => (validators[c] ? { ...p, [c]: validators[c] } : { ...p }),
      {}
    );
    const validateObject = object().shape(paramsToValidate);

    return async (req, res, next) => {
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

    return async (req, res, next) => {
      try {
        const validatedBody = await validateObject.validate(req.body, { abortEarly: false });

        if (validatedBody.initialTime > validatedBody.finishTime)
          throw new BadRequest('O tempo inicial não pode ser maior que o tempo final');

        req.body = validatedBody;
        req.body.barberId = req.userId
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
