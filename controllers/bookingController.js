const model = require('../models/booking');

const Dietician = require('../models/dietician');
const Customer = require('../models/customer');

generateIncludes = (includeDietician, includeCustomer) => {
    let includes = [];
    if (includeDietician) includes.push({
        model: Dietician,
        attributes: ['id', 'name', 'education', 'place', 'email', 'phone']
    });
    if (includeCustomer) includes.push({
        model: Customer, 
        attributes: ['id', 'name', 'email']
    });
    return includes;
}

module.exports = {
    get: ({dieticianId, customerId, includeDietician, includeCustomer, includeDescription}) => {
        const includes = generateIncludes(includeDietician, includeCustomer);

        let wheres = {};
        if (dieticianId) wheres.dieticianId = dieticianId;
        if (customerId) wheres.customerId = customerId;

        return new Promise((resolve, reject) => {
            if (!dieticianId && !customerId) {
                reject(400);
            } else {
                let attributes = ['id', 'startsAt', 'endsAt'];
                if (includeDescription) attributes.push('description');
                model.findAll({ 
                    attributes: attributes,
                    include: includes,
                    where: wheres
                }).then((result) => {
                    resolve(JSON.stringify(result));
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
        console.log(newBooking);
        return new Promise((resolve, reject) => {
            return model.create({
                customerId: newBooking.customerId,
                dieticianId: newBooking.dieticianId,
                startsAt: new Date(newBooking.startsAt),
                endsAt: new Date(newBooking.endsAt),
                description: newBooking.description,
            })
            .then((result) => {
                resolve(JSON.stringify(result));
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });

        // model.create({
        //     customerId: knownEntities.cust1.id,
        //     dieticianId: knownEntities.diet1.id,
        //     startsAt: new Date("2020-03-01T12:00:00.000Z"),
        //     endsAt: new Date("2020-03-01T12:15:00.000Z"),
        //     description: "Vegaanin ruokavalio",
        //     createdAt: new Date(),
        //     updatedAt: new Date()
        //   });
    }
};