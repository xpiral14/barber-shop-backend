'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'WorkIntervalTimes',
      [
        {
          barberId: 1,
          initialTime: 480,
          finishTime: 720,
        },
        {
          barberId: 1,
          initialTime: 840,
          finishTime: 1080,
        },
        { barberId: 3, initialTime: 600, finishTime: 960 },
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
