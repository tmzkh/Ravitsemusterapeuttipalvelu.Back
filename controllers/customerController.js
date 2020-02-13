const model = require('../models/customer');

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            model.findAll({attributes: ['id', 'name', 'email']})
            .then((customers) => {
                resolve(JSON.stringify(customers));
            }).catch((err) => {
                //console.error(err);
                reject(err);
            });
        });
    },
    getOne: ({id, name, email}) => {
        return new Promise((resolve, reject) => {
            if (id) {
                model
                    .findByPk(id, {attributes: ['id', 'name', 'email']})
                    .then((result) => {
                        if (!result) {
                            resolve(404);
                        } else {
                            resolve(JSON.stringify({
                                id: result.id,
                                name: result.name,
                                email: result.email
                            }));
                        }
                        
                    }).catch((err) => {
                        //console.error(err);
                        reject("Could not find customer by id");
                    });
            } else if (email) {
                model
                    .findOne({
                        attributes: ['id', 'name', 'email'], 
                        where: {email: email}})
                    .then((result) => {
                        resolve(JSON.stringify({
                            id: result.id,
                            name: result.name,
                            email: result.email
                        }));
                    }).catch((err) => {
                        //console.error(err);
                        reject("Could not find customer by email");
                    });
            } else {
                reject("Could not find customer");
            }
        });
    },

    create: ({name, email}) => {
        return new Promise((resolve, reject) => {
            model
                .create({name: name, email: email})
                .then((result) => {
                    resolve(JSON.stringify({
                        id: result.id,
                        name: result.name,
                        email: result.email
                    }));
                }).catch((err) => {
                    //console.error(err);
                    reject(err);
                });
        });
    },

    update: ({id, name, email}) => {
        return new Promise((resolve, reject) => {
            model
                .update({
                    name: name, 
                    email: email
                }, { where: { id: id } })
                .then((result) => {
                    if (result == 1) {
                        return model.findByPk(id);
                    }
                    resolve(404);
                }).then(result => {
                    if (typeof(result) != 'undefined') {
                        resolve(JSON.stringify({
                            id: result.id,
                            name: result.name,
                            email: result.email
                        }));
                    } else {
                        resolve(404);
                    }
                })
                .catch((err) => {
                    //console.error(err);
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