'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Services',
      [
        {
          id:1,
          name: 'Corte Masculino',
          price: 20,
        },
        {
          id:2,
          name: 'Barba',
          price: 15,
        },
        {
          id:3,
          name: 'Progressiva',
          price: 25,
        },
        {
          id:4,
          name: 'Manutenção',
          price: 10,
        },
        {
          id:5,
          name: 'Selagem',
          price: 35,
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
