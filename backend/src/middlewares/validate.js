import { string, object, number } from "yup";
import {
  requiredField,
  invalidField,
  minFieldSize,
  maxFieldSize,
} from "../constants/messages";
import validateCNPJ from "../utils/validateCNPJ";

export default function validate(fields = []) {
  const allFields = {
    genderId: number().required(requiredField("código do gênero")).default(1),
    name: string().required(requiredField("Nome")),
    fantasyName: string().required(requiredField("nome fantasia")),
    userTypeId: number().default(1).required(requiredField("tipo de usuário")),
    logo: string(),

    cnpj: string()
      .test(
        "cnpjValidation",
        invalidField("CNPJ"),
        (value) => value && validateCNPJ(value)
      )
      .transform(function (value, originalValue) {
        return (value = value?.replace(/\D/g, ""));
      }),

    logo: string(),

    email: string()
      .email(invalidField("Email"))
      .required(requiredField("Email")),

    password: string()
      .min(3, minFieldSize("senha", 3))
      .required(requiredField("senha")),

    companyId: number().required(requiredField("codigo da empresa")),

    cep: string()
      .required(requiredField("CEP"))
      .min(8, invalidField("CEP"))
      .transform(function (value, originalValue) {
        return (value = value.replace(/\D/g, ""));
      }),

    state: string().max(30, maxFieldSize("estado", 20)),

    city: string().max(30, maxFieldSize("cidade", 20)),

    neighborhood: string().max(30, maxFieldSize("bairro", 20)),

    street: string().max(30, maxFieldSize("rua", 20)),

    number: string().max(30, maxFieldSize("número", 20)),

    phone: string()
      .matches(
        /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm,
        invalidField("telefone")
      )
      .required(requiredField("Telefone"))
      .transform(function (value, originalValue) {
        // if(this.isType(value)) return value
        return (value = value.replace(/\D/g, ""));
      }),
    userId: number().required(requiredField("código do usuário")),
    serviceId: number().required(requiredField("código do serviço")),

    price: number()
      .max(10000, maxFieldSize("preço", 10000))
      .required(requiredField("preço")),
  };

  let objectSchema = {};

  fields.map((field) => {
    objectSchema = {
      ...objectSchema,
      [field]: allFields[field],
    };
  });
  const schema = object(objectSchema);
  return async (req, res, next) => {
    try {
      req.data = await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(error);
    }
  };
}
