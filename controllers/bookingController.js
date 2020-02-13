const model = require('../models/booking');

const Dietician = require('../models/dietician');
const Customer = require('../models/customer');

module.exports = {
    get: async ({dieticianId, customerId, includeDietician, includeCustomer}) => {

        let includes = [];
        if (includeDietician) includes.push({
            model: Dietician,
            attributes: ['id', 'name', 'education', 'place', 'email', 'phone']
        });
        if (includeCustomer) includes.push({
            model: Customer, 
            attributes: ['id', 'name', 'email']
        });

        return new Promise((resolve, reject) => {
            if (dieticianId && customerId) {
                model.findAll({ 
                    attributes: ['id', 'startsAt', 'endsAt', 'description'],
                    include: includes,
                    where: { 
                        dieticianId: dieticianId, 
                        customerId: customerId 
                    }  
                }).then((result) => {
                    resolve(JSON.stringify(result));
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }
};