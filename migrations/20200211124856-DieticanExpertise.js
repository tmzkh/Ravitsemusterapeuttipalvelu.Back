'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dietician_expertise', 
    { 
      dieticianId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'dieticians',
          key:'id'
        }
      },
      expertiseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'expertises',
          key:'id'
        }
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dietician_expertise');
  }
};
