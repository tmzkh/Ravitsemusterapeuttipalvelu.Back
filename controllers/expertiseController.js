const model = require('../models/expertise');

module.exports = {
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                return resolve( await model.findAll() );
            } catch (e) {
                return reject(e);
            }
        });
    }
}