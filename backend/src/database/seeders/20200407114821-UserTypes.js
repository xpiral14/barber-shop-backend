"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UserTypes",
      [
        {
          id:1,
          name: "BARBER",
        },
        {
          id:2,
          name: "COSTUMER",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserTypes", null, {});
  },
};
