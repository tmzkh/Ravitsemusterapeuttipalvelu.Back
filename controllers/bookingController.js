const model = require('../models/booking');

const Dietician = require('../models/dietician');
const Customer = require('../models/customer');

const Op = require('sequelize').Op;

const get = ({dieticianId, customerId, startDate, endDate, includeCustomer, includeDescription}) => {

    const wheres = generateWheres(startDate, endDate, dieticianId, customerId);
    const includes = generateIncludes(includeCustomer);


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
};

module.exports = {
    get: get,

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
        return new Promise(async (resolve, reject) => {
            const bookings = 
                await get({
                    dieticianId: newBooking.dieticianId,
                    customerId: newBooking.customerId,
                    startDate: newBooking.startsAt,
                    endDate: newBooking.endsAt,
                    includeCustomer: false,
                    includeDescription: false
                });

            console.log(typeof (bookings), bookings.length);

            if ( bookings.length == 0) {
                return model.create({
                    customerId: newBooking.customerId,
                    dieticianId: newBooking.dieticianId,
                    startsAt: newBooking.startsAt,
                    endsAt: newBooking.endsAt,
                    description: newBooking.description,
                }).then((result) => {
                    resolve(JSON.stringify(result));
                }).catch((err) => {
                    reject(err);
                });
            }
            reject({
                errors: {
                    startsAt: 'Chosen time is not available'
                }
            });
        });
    },

    update: (updatedBooking) => {
        //console.log(newBooking);
        return new Promise((resolve, reject) => {
            return model.update({
                startsAt: updatedBooking.startsAt,
                endsAt: updatedBooking.endsAt,
            }, {where: {id: updatedBooking.id}}).then((result) => {
                resolve(JSON.stringify(result));
            }).catch((err) => {
                reject(err);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            model
                .destroy({ where: { id: id } })
                .then((result) => {
                    if (result == 1)
                        resolve();
                    resolve(404);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
};

generateIncludes = (includeCustomer) => {
    let includes = [];
    if (includeCustomer) {
        includes.push({
            model: Customer, 
            attributes: ['id'],
        });
    }
    if (includeCustomer) {
        includes.push({
            model: Customer, 
            attributes: ['id'],
        });
    }
    return includes;
}

generateWheres = (startDate, endDate, dieticianId, customerId) => {
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
    return wheres;
}