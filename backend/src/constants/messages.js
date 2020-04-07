export const notfound = (field, gender) =>
  gender === "F" ? `${field} não encontrada.` : `${field} não encontrado.`;

export const invalidField = (field, gender) =>
  gender === "F" ? `${field} inválida` : `${field} inválido`;

export const requiredField = (field) => `O campo ${field} é obrigatório.`;
