"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UserTypes",
      [
        {
          id:1,
          name: "EMPLOYEE",
        },
        {
          id:2,
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
