const Sequelize = require('sequelize');
// config dotenv
require('dotenv').config();
const db = require('../config/database')();

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