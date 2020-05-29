'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'perfilImage', {
      type: Sequelize.STRING,
      after: "email"
    });
    return queryInterface.addColumn('Users', 'birth', {
      after: "perfilImage",
      type: Sequelize.DATEONLY,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'birth');
    return queryInterface.removeColumn('Users', 'perfilImage');
  },
};
