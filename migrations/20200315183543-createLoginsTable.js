'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'logins', { 
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          validate: {
              isUUID: 4,
          }
      },
      userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'user',
            key:'id'
          }
      },
      accessToken: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      role: {
          type: Sequelize.STRING,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('logins');
  }
};
