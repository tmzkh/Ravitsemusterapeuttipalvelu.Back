'use strict';
const Dietician = require('./dietician');
const Expertise = require('./expertise');

const Sequelize = require('sequelize');
require('dotenv').config();
const db = require('../config/database')({
        dbHost: process.env.DB_HOST, 
        dbName: process.env.DB_NAME, 
        username: process.env.DB_USERNAME, 
        pwd:process.env.DB_PWD
    });

const DieticianExpertise = db.define('dietician_expertise', 
    { 

    }, { timestamps: false });

Dietician.belongsToMany(Expertise, {through: 'dietician_expertise'});
Expertise.belongsToMany(Dietician, {through: 'dietician_expertise'});

module.exports = DieticianExpertise;

