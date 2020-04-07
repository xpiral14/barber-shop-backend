"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UserTypes",
      [
        {
          name: "EMPLOYEE",
        },
        {
          name: "CLIENT",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UserTypes", null, {});
  },
};
