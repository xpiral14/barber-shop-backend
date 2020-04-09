export const notfound = (field, gender) =>
  gender === "F" ? `${field} não encontrada.` : `${field} não encontrado.`;

export const invalidField = (field, gender) =>
  gender === "F" ? `${field} inválida` : `${field} inválido`;

export const requiredField = (field) => `O campo ${field} é obrigatório.`;

export const minFieldSize = (field, value) =>
  `O campo ${field} deve ter ao menos ${value} ${
    value === 1 ? "caractere" : "caracteres"
  }`;
export const maxFieldSize = (field, value) =>
  `O campo ${field} deve ter no máximo ${value} ${
    value === 1 ? "caractere" : "caracteres"
  }`;

export const exists = (entity, field, entityGender, fieldGender) =>
  `Já existe ${entityGender === "F" ? "uma" : "um"} ${entity} com ${
    fieldGender === "F" ? "esta" : "este"
  } ${field}`;

export const registered = (field, gender) => `${gender === "F" ? "Esta" : "Este"} ${field} já está cadastrado no sistema.` 

export const notExists = (field, gender) => `Não existe ${gender === "F"? "uma" : "um"} ${field} com este valor.`