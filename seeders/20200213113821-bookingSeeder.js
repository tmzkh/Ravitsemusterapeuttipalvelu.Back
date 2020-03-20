'use strict';

const knownEntities = require('./helpers/knownEntities');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let bookings = [];
    let dieticians = [knownEntities.diet1.id, knownEntities.diet2.id, knownEntities.diet3.id, knownEntities.diet4.id];
    let customers = [knownEntities.cust1.id, knownEntities.cust2.id, knownEntities.cust3.id, knownEntities.cust4.id];
    let descriptions = ["Vegaanin ruokavalio", "Keto-ruokavalio", "Ruokavalion tarkistus", "Ruokavalion suunnittelu", "Gluteeniton ruokavalio"];
    
    const numberOfBookings = 30;
    
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    for (let i = 0; i < numberOfBookings; i++) {
      let time = new Date(faker.date.between('2020-01-01', '2020-12-31'));
      let rand = getRandomIntInclusive(8, 16);
      
      let startTime = new Date(time);
      let endTime = new Date(time);

      startTime.setHours(rand, 0, 0, 0)
      endTime.setHours(rand + 1, 0, 0, 0);

      const booking = {
        id: faker.random.uuid(),
        customerId: faker.random.arrayElement(customers),
        dieticianId: faker.random.arrayElement(dieticians),
        startsAt: startTime,
        endsAt: endTime,
        description: faker.random.arrayElement(descriptions),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      bookings.push(booking);
    }
    /*let bookings = [];
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
    });*/

    return queryInterface.bulkInsert('bookings', bookings);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  }
};
