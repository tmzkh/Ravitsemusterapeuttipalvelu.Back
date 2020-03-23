'use strict';

const knownEntities = require('./helpers/knownEntities');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let d_e = [];
    let dieticians = [knownEntities.diet1.id, knownEntities.diet2.id, knownEntities.diet3.id, knownEntities.diet4.id];

    function getExpertiseIds() {
      let expertiseIds = [];
      while (expertiseIds.length < 6) {
        let rnd = Math.floor(Math.random() * 12) + 1;
        if (expertiseIds.indexOf(rnd) === -1) expertiseIds.push(rnd);
      }
      return expertiseIds;
    }
    
    for (let i = 0; i < dieticians.length; i++) {
      let ids = [];
      ids = getExpertiseIds();
      for (let j = 0; j < ids.length; j++) {
        d_e.push({
          dieticianId: dieticians[i],
          expertiseId: ids[j]
        });
      }
    }
    /*
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
    */

    return queryInterface.bulkInsert('dietician_expertise', d_e);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dietician_expertise', null, {});
  }
};
