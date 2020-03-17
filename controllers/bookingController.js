const model = require('../models/booking');

const Dietician = require('../models/dietician');
const Customer = require('../models/customer');

const Op = require('sequelize').Op;

generateIncludes = (includeCustomer) => {
    let includes = [];
    if (includeCustomer) includes.push({
        model: Customer, 
        attributes: ['id'],
    });
    return includes;
}

module.exports = {
    get: ({dieticianId, customerId, startDate, endDate, includeCustomer, includeDescription}) => {
        const includes = generateIncludes(includeCustomer);
        let wheres = {
            [Op.and]: {
                startsAt: {
                    [Op.lt]: endDate
                },
                endsAt: {
                    [Op.gt]: startDate
                }
            }
        };
        if (dieticianId) wheres.dieticianId = dieticianId;
        if (customerId) wheres.customerId = customerId;

        return new Promise((resolve, reject) => {
            if (! dieticianId && ! customerId) {
                reject(400);
            } else {
                let attributes = ['id', 'startsAt', 'endsAt'];
                if (includeDescription) attributes.push('description');
                model.findAll({ 
                    attributes: attributes,
                    include: includes,
                    where: wheres
                }).then((result) => {
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    },

    getOne: ({id, includeDietician, includeCustomer, includeDescription}) => {
        return new Promise((resolve, reject) => {
            if (id) {
                const includes = generateIncludes(includeDietician, includeCustomer);
                let attributes = ['id', 'customerId', 'dieticianId', 'startsAt', 'endsAt'];
                if (includeDescription) attributes.push('description');
                model.findByPk(id, { 
                    attributes: attributes,
                    include: includes,
                }).then((result) => {
                    resolve(JSON.stringify(result));
                }).catch((err) => {
                    reject(err);
                });
            } else {
                reject(400);
            }
        });
    },

    create: (newBooking) => {
        //console.log(newBooking);
        return new Promise((resolve, reject) => {
            return model.create({
                customerId: newBooking.customerId,
                dieticianId: newBooking.dieticianId,
                startsAt: new Date(newBooking.startsAt),
                endsAt: new Date(newBooking.endsAt),
                description: newBooking.description,
            }).then((result) => {
                resolve(JSON.stringify(result));
            }).catch((err) => {
                reject(err);
            });
        });
    }
};