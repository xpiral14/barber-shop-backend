import { Op } from "sequelize";
let queryOptions = {
  separator: "_",
  valueSeparator: ","
};

/**
 * Dado um objeto seguindo o padrão de nomeclatura nomeDoCampo_nomDoOperador
 * retorna um objeto que o `sequelize` consegue interpretar como um atributo
 * `where` em uma query
 * @example
 * let entrada = {idade_gt: 5, nome_like: 'Samuel Reis'}
 *
 * // {idade: {[Op.gt]: 5}, nome:[Op.like]: 'Samuel Reis'}
 * let saida = queryParamToSequelizeQuery(entrada);
 *
 * @param {object} queryParams objeto seguindo o padrao: `{nomeDoCampo_operado: valorDoCampo}`
 */
export default function queryParamToSequelizeQuery(queryParams, options = queryOptions) {
  // retorna o array com as chaves dos atributos
  let queryParamKeys = Object.keys(queryParams);
  let sequelizeQuery = {};

  // iteração sobre cada chave do objeto obtido no parâmetro
  for (let queryParam of queryParamKeys) {
    let paramValue = queryParams[queryParam];

    // caso a chave possua um caractere de separação então separa a string por ele e
    // pega o operador que vem apóes ele.
    let operator = queryParam.includes(options.separator)
      ? queryParam.split(options.separator)[1]
      : null;

    // separa a chave pelo caractere '_' e pega somente a parte que nomeia o
    // campo
    let field = queryParam.split(options.separator)[0];

    // objeto que será montado de acordo com os atributos passados em queryParams
    sequelizeQuery = {
      //adiciona os atributos que o objeto já possuia
      ...sequelizeQuery,
      // nomeia o novo atributo com o nome do campo
      [field]:
        // se o operador for diferente de nulo, então adiciona o operador do
        // sequelize como um sub-atributo e seu valor como o valor passado pela chave.
        operator !== null
          ? {
              // se o valor da parametro possuir um separador então separe-o e transforme-o em um array
              [Op[operator]]: paramValue.includes(options.valueSeparator)
                ? paramValue.split(options.valueSeparator)
                : paramValue
            }
          : paramValue
    };
  }
  return sequelizeQuery;
}