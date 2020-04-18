'use strict';
const Sequelize = require('sequelize');
//require('dotenv').config();
const db = require('../config/database')();

const Expertise = db.define('expertise', {
  id: {
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  name: {
    type:Sequelize.STRING
  }
}, { timestamps:false });

module.exports = Expertise;