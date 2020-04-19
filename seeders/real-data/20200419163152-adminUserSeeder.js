'use strict';

const knownEntities = require('../helpers/knownEntities');

const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const pwd1 = bcrypt.hashSync(knownEntities.user1.password, salt);
const pwd2 = bcrypt.hashSync(knownEntities.user2.password, salt);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', 
    [
      {
        id: knownEntities.user1.id,
        username: knownEntities.user1.username,
        password: pwd1,
        roleId: knownEntities.user1.roleId,
        dieticianId: knownEntities.user1.dieticianId,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
