'use strict';

const knownEntities = require('./helpers/knownEntities');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bookings = [];

    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust1.id,
      dieticianId: knownEntities.diet1.id,
      startsAt: new Date("2020-03-01T12:00:00.000Z"),
      endsAt: new Date("2020-03-01T12:15:00.000Z"),
      description: "Vegaanin ruokavalio",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust2.id,
      dieticianId: knownEntities.diet1.id,
      startsAt: new Date("2020-03-01T12:15:00.000Z"),
      endsAt: new Date("2020-03-01T12:30:00.000Z"),
      description: "Keto-ruokavalio",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust1.id,
      dieticianId: knownEntities.diet2.id,
      startsAt: new Date("2020-03-02T12:00:00.000Z"),
      endsAt: new Date("2020-03-02T12:15:00.000Z"),
      description: "Vegaanin ruokavalio",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust2.id,
      dieticianId: knownEntities.diet2.id,
      startsAt: new Date("2020-03-01T13:00:00.000Z"),
      endsAt: new Date("2020-03-01T13:15:00.000Z"),
      description: "asdf",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust1.id,
      dieticianId: knownEntities.diet1.id,
      startsAt: new Date("2020-04-01T12:00:00.000Z"),
      endsAt: new Date("2020-04-01T12:15:00.000Z"),
      description: "Ruokavalion tarkistus",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust1.id,
      dieticianId: knownEntities.diet1.id,
      startsAt: new Date("2020-05-01T12:00:00.000Z"),
      endsAt: new Date("2020-05-01T12:15:00.000Z"),
      description: "Vegaanin ruokavalio",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust2.id,
      dieticianId: knownEntities.diet1.id,
      startsAt: new Date("2020-05-01T12:15:00.000Z"),
      endsAt: new Date("2020-05-01T12:30:00.000Z"),
      description: "Keto-ruokavalio",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust1.id,
      dieticianId: knownEntities.diet2.id,
      startsAt: new Date("2020-05-02T12:00:00.000Z"),
      endsAt: new Date("2020-05-02T12:15:00.000Z"),
      description: "Vegaanin ruokavalio",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust2.id,
      dieticianId: knownEntities.diet2.id,
      startsAt: new Date("2020-05-01T13:00:00.000Z"),
      endsAt: new Date("2020-05-01T13:15:00.000Z"),
      description: "asdf",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    bookings.push({
      id: faker.random.uuid(),
      customerId: knownEntities.cust1.id,
      dieticianId: knownEntities.diet1.id,
      startsAt: new Date("2020-06-01T12:00:00.000Z"),
      endsAt: new Date("2020-06-01T12:15:00.000Z"),
      description: "Ruokavalion tarkistus",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return queryInterface.bulkInsert('bookings', bookings);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  }
};
