'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'BarberServices',
      [
        {
          barberId: 1,
          serviceId: 1,
        },
        {
          barberId: 1,
          serviceId: 2,
        },
        {
          barberId: 1,
          serviceId: 3,
        },
        {
          barberId: 1,
          serviceId: 4,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
