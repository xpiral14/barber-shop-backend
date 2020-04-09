"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Genders",
      [
        {
          id: 1,
          name: "FEMALE",
        },
        {
          id:2,
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
