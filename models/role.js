const Sequelize = require('sequelize');
// config dotenv
require('dotenv').config();
const db = require('../config/database')({
        dbHost: process.env.DB_HOST, 
        dbName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        pwd:process.env.DB_PWD
    });

const Role = db.define('role', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    name: {
        type:Sequelize.STRING
    }
}, { timestamps:false });

module.exports = Role;