export const notfound = (field: string, gender?:string) =>
  gender === 'F' ? `${field} não encontrada.` : `${field} não encontrado.`;

export const invalidField = (field: string, gender?:string) =>
  gender === 'F' ? `${field} inválida` : `${field} inválido`;

export const requiredField = (field: string) => `O campo ${field} é obrigatório.`;

export const minFieldSize = (field: string, value:number) =>
  `O campo ${field} deve ter ao menos ${value} ${value === 1 ? 'caractere' : 'caracteres'}`;

export const maxFieldSize = (field: string, value:number) =>
  `O campo ${field} deve ter no máximo ${value} ${value === 1 ? 'caractere' : 'caracteres'}`;

export const exists = (entity:string, field:string, entityGender:string, fieldGender:string) =>
  `Já existe ${entityGender === 'F' ? 'uma' : 'um'} ${entity} com ${
    fieldGender === 'F' ? 'esta' : 'este'
  } ${field}`;

export const registered = (field: string, gender?:string) =>
  `${gender === 'F' ? 'Esta' : 'Este'} ${field} já está cadastrado no sistema.`;

export const notExists = (field: string, gender?:string) =>
  `Não existe ${gender === 'F' ? 'uma' : 'um'} ${field} com este valor.`;
