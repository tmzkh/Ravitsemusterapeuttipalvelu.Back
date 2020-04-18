'use strict';
const Dietician = require('./dietician');
const Expertise = require('./expertise');

const Sequelize = require('sequelize');
//require('dotenv').config();
const db = require('../config/database')();

const DieticianExpertise = db.define('dietician_expertise', 
    { 

    }, { timestamps: false, tableName: 'dietician_expertise' });

Dietician.belongsToMany(Expertise, {through: 'dietician_expertise'});
Expertise.belongsToMany(Dietician, {through: 'dietician_expertise'});

module.exports = DieticianExpertise;

