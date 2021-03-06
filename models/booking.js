const Sequelize = require('sequelize');
// config dotenv
//require('dotenv').config();
const db = require('../config/database')();

const moment = require('moment');

const Booking = db.define('booking', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        validate: {
            isUUID: {
                args: 4,
                msg: "Id must be in UUID4 fromat"
            }
        }
    },
    customerId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Customer id is required"
            }, 
            isUUID: {
                args: 4,
                msg: "Id must be in UUID4 fromat"
            }
        }
    },
    dieticianId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Dietician id is required"
            }, 
            isUUID: {
                args: 4,
                msg: "Id must be in UUID4 fromat"
            }
        }
    },
    startsAt: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Start date is required"
            },
            isDate:{
                msg: "Invalid date formatting"
            },
        }
    },
    endsAt: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "End date is required"
            },
            isDate:{
                msg: "Invalid date formatting"
            },
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Description is required"
            },
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
}, {
    timestamps: true,
    validate: {
        startDateAfterEndDate() {
          if (moment(this.endsAt).isSameOrBefore(this.startsAt)) {
            throw new Error('EndsAt must be after StartsAt');
          }
        }
      }
});

const Dietician = require('./dietician');
const Customer = require('./customer');

Booking.belongsTo(Dietician);
Dietician.hasMany(Booking);

Booking.belongsTo(Customer);
Customer.hasMany(Booking);

module.exports = Booking;