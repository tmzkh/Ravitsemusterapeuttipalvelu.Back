const model = require('../models/booking');

const Dietician = require('../models/dietician');
const Customer = require('../models/customer');

const Op = require('sequelize').Op;

const get = ({dieticianId, customerId, startDate, endDate, includeIdAndCustomerDetails}) => {

    const wheres = generateWheres(startDate, endDate, dieticianId, customerId);
    const includes = generateIncludes(includeIdAndCustomerDetails);

    return new Promise(async (resolve, reject) => {
        if (! dieticianId && ! customerId) {
            return resolve(400);
        } else {
            let attributes = ['startsAt', 'endsAt'];
            if (includeIdAndCustomerDetails) {
                attributes.unshift('id');
                attributes.push('description');
            }
            try {
                return resolve(
                    await model.findAll({ 
                            attributes: attributes,
                            include: includes,
                            where: wheres
                        })
                );
            } catch (err) {
                reject(err);
            }
        }
    });
};

module.exports = {
    get: get,

    getOne: ({id, includeDietician, includeIdAndCustomerDetails}) => {
        return new Promise(async (resolve, reject) => {
            if (id) {
                const includes = generateIncludes(includeDietician, includeCustomer);
                let attributes = ['startsAt', 'endsAt'];
                if (includeIdAndCustomerDetails) {
                    attributes.unshift('id');
                    attributes.push('description');
                }
                try {
                    resolve(
                        await model.findByPk(id, { 
                            attributes: attributes,
                            include: includes,
                        })
                    );
                } catch(e) {
                    reject(e);
                }
            } else {
                reject(400);
            }
        });
    },
    
    create: (newBooking) => {
        return new Promise(async (resolve, reject) => {
            const bookings = 
                await get({
                    dieticianId: newBooking.dieticianId,
                    customerId: newBooking.customerId,
                    startDate: newBooking.startsAt,
                    endDate: newBooking.endsAt,
                    includeIdAndCustomerDetails: false
                });

            if ( bookings.length == 0) {
                try {
                    return resolve(
                        await model.create({
                            customerId: newBooking.customerId,
                            dieticianId: newBooking.dieticianId,
                            startsAt: newBooking.startsAt,
                            endsAt: newBooking.endsAt,
                            description: newBooking.description,
                        })
                    );
                } catch (e) {
                    reject(e);
                }
            }
            reject({
                errors: {
                    startsAt: 'Chosen time is not available'
                }
            });
        });
    },

    update: (updatedBooking) => {
        return new Promise(async (resolve, reject) => {
            try {
                return resolve(
                    await model.update({
                            startsAt: updatedBooking.startsAt,
                            endsAt: updatedBooking.endsAt,
                        }, {where: {id: updatedBooking.id}})
                );
            } catch (e) {
                reject(e);
            }
        });
    },

    delete: ({id, dieticianId, customerId}) => {
        return new Promise(async (resolve, reject) => {
            if (!dieticianId && ! customerId) return reject();
            let wheres = { id: id };
            if (dieticianId) wheres.dieticianId = dieticianId;
            else if (customerId) wheres.customerId = customerId;
            try {
                const result = await model.destroy({ where: wheres });
                if (result == 1)
                    return resolve();
                return resolve(404);
            } catch (e) {
                return reject(e);
            }
        });
    }
};

generateIncludes = (includeCustomer) => {
    let includes = [];
    if (includeCustomer) {
        includes.push({
            model: Customer, 
            attributes: ['id', 'name', 'email'],
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