'use strict';
const Sequelize = require('sequelize');
require('dotenv').config();
const db = require('../config/database')({
        dbHost: process.env.DB_HOST, 
        dbName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        pwd:process.env.DB_PWD
    });

const Expertise = db.define('expertise', {
  id: {
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  name: {
    type:Sequelize.STRING
  }
}, { timestamps:false });

// Expertise.associate = function(models) {
//   Expertise.belongsToMany(models.dietician, { through: 'dietician_expertise', as: 'expertise' });
// }

module.exports = Expertise;