'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dieticians',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        education: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        place: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        },
        isPending: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dieticians');
  }
};
