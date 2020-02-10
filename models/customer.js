const Sequelize = require('sequelize');
// config dotenv
require('dotenv').config();
const db = require('../config/database')(
    {
        dbHost: process.env.DB_HOST, 
        dbName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        pwd:process.env.DB_PWD
    });

const Customer = db.define('customer', {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Customer;