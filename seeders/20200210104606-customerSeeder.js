'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let customers = [];

    for (let i = 0; i < 30; i++) {
      const customer = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      customers.push(customer);
    }

    return queryInterface.bulkInsert('customers', customers);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  }
};
