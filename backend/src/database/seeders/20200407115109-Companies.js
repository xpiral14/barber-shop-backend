"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Companies",
      [
        {
          id:1,
          fantasyName: "Samuel Corte fino",
          cnpj: "53300539000122",
          email: "sa@gmail.com",
          passwordhash:
            "$2b$08$P4cfNPFO6m5IKnLPfW8NOeMncEq4E7/daN7ekK9QT9b9Bm28Hv2ty",
        },
        {
          id:2,
          fantasyName: "Barba Afiada",
          cnpj: "72363313000115",
          email: "barbaafiada@gmail.com",
          passwordhash:
            "$2b$08$P4cfNPFO6m5IKnLPfW8NOeMncEq4E7/daN7ekK9QT9b9Bm28Hv2ty",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Companies", null, {});
  },
};
