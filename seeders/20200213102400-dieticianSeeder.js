'use strict';

const knownEntities = require('./helpers/knownEntities');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let dieticians = [];

    dieticians.push(knownEntities.diet1);
    dieticians.push(knownEntities.diet2);

    return queryInterface.bulkInsert('dieticians', dieticians);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dieticians', null, {});
  }
};
