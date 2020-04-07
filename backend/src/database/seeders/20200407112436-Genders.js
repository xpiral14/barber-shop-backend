"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Genders",
      [
        {
          name: "FEMALE",
        },
        {
          name: "MASCULINE",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Genders', null, {});
    
  },
};
