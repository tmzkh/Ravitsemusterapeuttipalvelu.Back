'use strict';

const knownEntities = require('./helpers/knownEntities');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let d_e = [];

    d_e.push({
      dieticianId: knownEntities.diet1.id,
      expertiseId: 1
    });
    d_e.push({
      dieticianId: knownEntities.diet1.id,
      expertiseId: 3
    });
    d_e.push({
      dieticianId: knownEntities.diet1.id,
      expertiseId: 4
    });
    d_e.push({
      dieticianId: knownEntities.diet1.id,
      expertiseId: 6
    });

    d_e.push({
      dieticianId: knownEntities.diet2.id,
      expertiseId: 3
    });
    d_e.push({
      dieticianId: knownEntities.diet2.id,
      expertiseId: 4
    });
    d_e.push({
      dieticianId: knownEntities.diet2.id,
      expertiseId: 8
    });
    d_e.push({
      dieticianId: knownEntities.diet2.id,
      expertiseId: 10
    });
    

    return queryInterface.bulkInsert('dietician_expertise', d_e);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dietician_expertise', null, {});
  }
};
