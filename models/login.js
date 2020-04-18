const Sequelize = require('sequelize');

const User = require('./user');

// config dotenv
require('dotenv').config();
const db = require('../config/database')();

const Login = db.define('logins', {
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
    },
    accessToken: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {timestamps: true});

Login.belongsTo(User, {foreignKey: 'userId'});

module.exports = Login;