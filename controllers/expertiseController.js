const model = require('../models/expertise');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            model
                .findAll()
                .then((result) => {
                    console.log(result);
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
}