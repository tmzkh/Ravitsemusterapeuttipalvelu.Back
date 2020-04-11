'use strict';

const erityisosaamiset = [
  "Urheiluravitsemus",
  "Ikääntyneen ruokavalio",
  "Vegaaniravitsemus",
  "Syömishäiriöt & tunnesyöminen",
  "Tyypin 1 diabeteksen ravitsemushoito",
  "Kasvisruokailijan ravitsemus",
  "Arkiruokailu ja elintapaohjaus",
  "Painonhallinta ja syömiskäyttäytyminen",
  "Sydän- ja verisuonitautien ravitsemushoito",
  "Suolisto- ja vatsaongelmat",
  "Tyypin 2 diabetes ravitsemushoito",
  "Keliakia ja allergiat"
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    let expertises = [];

    for (let i = 0; i < erityisosaamiset.length; i++) {
      expertises.push({
        id: i + 1,
        name: erityisosaamiset[i]
      });
    }

    return queryInterface.bulkInsert('expertises', expertises);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('expertises', null, {});
  }
};
