'use strict';

const faker = require('faker');
const knownEntities = require('./helpers/knownEntities');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let customers = [];

    customers.push(knownEntities.cust1);
    customers.push(knownEntities.cust2);

    for (let i = 0; i < 30; i++) {
      const customer = {
        id: faker.random.uuid(),
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
