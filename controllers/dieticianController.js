const model = require('../models/dietician');
const expertiseModel = require('../models/expertise');
require('../models/dieticianexpertise');

const Sequelize = require('sequelize');

const Op = Sequelize.Op

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            model.findAll({
                where: { isPending: false },
                attributes: ['id', 'name', 'education', 'place', 'email', 'phone', 'imageUrl'],
                include: {
                    model: expertiseModel,
                    attributes: ['id'],
                    through: {
                        attributes: []
                    },
                    required: false
                },
            })
            .then((dietician) => {
                resolve(dietician);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    getFiltered: ({ query, expertiseIds, showPengind }) => {
        let expertiseWheres = {};

        if (expertiseIds && expertiseIds.length > 0) {
            let idWheres = [];
            expertiseIds.forEach(id => {
                idWheres.push({id: id});
            });
            expertiseWheres = {[Op.or]: idWheres};
        }
        return new Promise((resolve, reject) => {
            let dieticianIds = [];
            // first we must find dietician id:s
            return model.findAll({
                where: {
                    [Op.and]: {
                        [Op.or]: {
                            'name': {
                                [Op.like]: `%${query}%` 
                            },
                            'place': {
                                [Op.like]: `%${query}%` 
                            }
                        },
                        isPending: showPengind
                    }
                },
                include: {
                    model: expertiseModel,
                    where: expertiseWheres,
                    required: true
                },
            }).each((dietician) => {
                dieticianIds.push(dietician.id);
            }).then(() => {
                // then we can include every expertise
                return model.findAll({
                        where: {
                            id: dieticianIds
                        },
                        attributes: ['id', 'name', 'education', 'place', 'email', 'phone', 'imageUrl'],
                        include: {
                            model: expertiseModel,
                            attributes: ['id'],
                            through: {
                                attributes: []
                            }
                        },
                    })
            }).then((result) => {
                resolve(result);
            }).catch((err) => {
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
                        attributes: ['id', 'name', 'education', 'place', 'email', 'phone', 'imageUrl'],
                        include: {
                            model: expertiseModel,
                            attributes: ['id'],
                            through: {
                                attributes: []
                            }
                        },
                        where: wheres
                    }).then((result) => {
                        if (!result) {
                            resolve(404);
                        } else {
                            resolve(result);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
            } else {
                reject(err);
            }
        });
    },

    create: ({ name, education, place, email, phone, imageUrl, testing }) => {
        return new Promise((resolve, reject) => {
            model
                .create({ 
                    name: name, 
                    education: education, 
                    place: place, 
                    email: email, 
                    phone: phone, 
                    imageUrl: imageUrl,
                    isPending: testing ? false : true
                })
                .then((result) => {
                    resolve({
                        id: result.id,
                        name: result.name, 
                        education: result.education, 
                        place: result.place, 
                        email: result.email, 
                        phone: result.phone, 
                        imageUrl: result.imageUrl
                    });
                }).catch((err) => {
                    reject(err);
                });
        });
    },

    update: ({ id, name, education, place, email, phone, imageUrl, isPending }) => {
        return new Promise((resolve, reject) => {
            model
                .update({
                    name: name,
                    education: education,
                    place: place,
                    email: email,
                    phone: phone,
                    imageUrl: imageUrl,
                    isPending: isPending
                }, { where: { id: id } })
                .then((result) => {
                    if (result == 1) {
                        return model
                            .findOne({
                                attributes: ['id', 'name', 'education', 'place', 'email', 'phone', 'imageUrl'],
                                include: {
                                    model: expertiseModel,
                                    attributes: ['id'],
                                    through: {
                                        attributes: []
                                    }
                                },
                                where: { id: id }
                            })
                    }
                    resolve(404);
                }).then(result => {
                    if (typeof (result) != 'undefined') {
                        resolve(result);
                    } else {
                        resolve(404);
                    }
                })
                .catch((err) => {
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