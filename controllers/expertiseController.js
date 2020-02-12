const model = require('../models/expertise');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            model.findAll()
            .then((result) => {
                resolve(JSON.stringify(result));
            }).catch((err) => {
                reject(err);
            });
        });
    }
}