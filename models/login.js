const Sequelize = require('sequelize');

const User = require('./user');

// config dotenv
require('dotenv').config();
const db = require('../config/database')({
        dbHost: process.env.DB_HOST, 
        dbName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        pwd:process.env.DB_PWD
    });

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
    role: {
        type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {timestamps: true});

Login.belongsTo(User, {foreignKey: 'userId'});

module.exports = Login;