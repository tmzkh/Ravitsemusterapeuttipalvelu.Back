const model = require('../models/customer');
const sequelize = require('sequelize');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            model.findAll({attributes: ['id', 'name', 'email']})
            .then((customers) => {
                resolve(JSON.stringify(customers));
            }).catch((err) => {
                console.error(err);
                reject("Could not find all customer");
            });
        });
    },
    getOne: (id = null, email = null) => {
        return new Promise((resolve, reject) => {
            if (id) {
                model.findByPk(id, {attributes: ['id', 'name', 'email']}).
                then((result) => {
                    if (!result)
                        resolve([]);
                    resolve(JSON.stringify(result));
                }).catch((err) => {
                    console.error(err);
                    reject("Could not find customer by id");
                });
            } else if (email) {
                model.findOne({
                    attributes: ['id', 'name', 'email'], 
                    where: {email: email}}).
                then((result) => {
                    if (!result)
                        resolve([]);
                    resolve(JSON.stringify(result));
                }).catch((err) => {
                    console.error(err);
                    reject("Could not find customer by email");
                });
            } else {
                reject("Could not find customer");
            }
        });
    },

    create: ({name, email}) => {
        return new Promise((resolve, reject) => {
            model.create({name: name, email: email}).then((result) => {
                resolve(JSON.stringify({
                    id: result.id,
                    name: result.name,
                    email: result.email
                }));
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    }
};