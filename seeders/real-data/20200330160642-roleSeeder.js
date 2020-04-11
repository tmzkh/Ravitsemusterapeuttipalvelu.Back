'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', 
      [
        {
          id: 1,
          name: 'admin',
        },
        {
          id: 2,
          name: 'dietician',
        } 
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
