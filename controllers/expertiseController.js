const model = require('../models/expertise');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            try {
                resolve( await model.findAll() );
            } catch (e) {
                reject(e);
            }
        });
    }
}