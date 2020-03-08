const model = require('../models/dietician');
const expertiseModel = require('../models/expertise');
require('../models/dieticianexpertise');

const Sequelize = require('sequelize');

const Op = Sequelize.Op

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            model.findAll({ attributes: ['id', 'name', 'education', 'place', 'email', 'phone', 'imageUrl'] })
                .then((dietician) => {
                    console.log()
                    resolve(JSON.stringify(dietician));
                }).catch((err) => {
                    //console.error(err);
                    reject(err);
                });
        });
    },
    getFiltered: ({ query, expertiseIds }) => {
        let expertiseWheres = {};

        if (expertiseIds && expertiseIds.length > 0) {
            let idWheres = [];
            expertiseIds.forEach(id => {
                idWheres.push({id: parseInt(id)});
            });
            expertiseWheres = {[Op.or]: idWheres};
        }
        return new Promise((resolve, reject) => {
            let dieticianIds = [];
            // first we must find dietician id:s
            return model.findAll(
                {
                    where: {
                        [Op.or]: {
                            'name': {
                                [Op.like]: `%${query}%` 
                            },
                            'place': {
                                [Op.like]: `%${query}%` 
                            }
                        },
                    },
                    include: {
                        model: expertiseModel,
                        where: expertiseWheres,
                        required: true
                    },
                }
            ).each((dietician) => {
                dieticianIds.push(dietician.id);
            }).then(() => {
                // then we can include every expertise
                return model.findAll(
                    {
                        where: {
                            id: dieticianIds
                        },
                        include: {
                            model: expertiseModel,
                            attributes: ['id'],
                            through: {
                                attributes: []
                            }
                        },
                    })
            })
            .then((result) => {
                resolve(JSON.stringify(result));
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });

    },
    getOne: ({ id, name, email }) => {
        let wheres = {};
        if (id) wheres.id = id;
        if (name) wheres.name = name;
        if (email) wheres.email = email;
        return new Promise((resolve, reject) => {
            if (id || name || email) {
                model
                    .findOne({
                        attributes: ['id', 'name', 'email'],
                        where: wheres
                    }).then((result) => {
                        if (!result) {
                            resolve(404);
                        } else {
                            console.log(result);
                            resolve(JSON.stringify({
                                id: result.id,
                                name: result.name,
                                email: result.email
                            }));
                        }
                    }).catch((err) => {
                        //console.error(err);
                        reject("Could not find dietician");
                    });
            } else {
                reject("Could not find dietician");
            }
        });
    },

    create: ({ name, education, place, email, phone, imageUrl }) => {
        return new Promise((resolve, reject) => {
            model
                .create({ name: name, education: education, place: place, email: email, phone: phone, imageUrl: imageUrl })
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

    update: ({ id, name, education, place, email, phone, imageUrl }) => {
        return new Promise((resolve, reject) => {
            model
                .update({
                    name: name,
                    education: education,
                    place: place,
                    email: email,
                    phone: phone,
                    imageUrl: imageUrl
                }, { where: { id: id } })
                .then((result) => {
                    if (result == 1) {
                        return model.findByPk(id);
                    }
                    resolve(404);
                }).then(result => {
                    if (typeof (result) != 'undefined') {
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