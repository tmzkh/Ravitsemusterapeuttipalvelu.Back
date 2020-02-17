'use strict';

const faker = require('faker');
const knownEntities = require('./helpers/knownEntities');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let dieticians = [];

    dieticians.push(knownEntities.diet1);
    dieticians.push(knownEntities.diet2);

    for (let i = 0; i < 30; i++) {
      const dietician = {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        education: faker.lorem.words(),
        place: faker.address.city(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        imageUrl: faker.image.imageUrl(),
        isPending: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dieticians.push(dietician);
    }

    return queryInterface.bulkInsert('dieticians', dieticians);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dieticians', null, {});
  }
};
