const model = require('../models/dietician');
const expertiseModel = require('../models/expertise');
require('../models/dieticianexpertise');

const Sequelize = require('sequelize');

const Op = Sequelize.Op

const getOne = async ({ id, name, email, includeIsPending }) => {
    // define query conditions
    let wheres = {};
    if (id) wheres.id = id;
    if (name) wheres.name = name;
    if (email) wheres.email = email;

    // define attributes that model returns
    let attributes = ['id', 'name', 'education', 'place', 'email', 'phone', 'imageUrl'];
    if (includeIsPending) attributes.push('isPending');
                
    return new Promise(async (resolve, reject) => {
        if (! id && ! name && ! email) {
            return reject(400);
        }
        try {
            const result = 
                await model.findOne({
                    attributes: attributes,
                    include: {
                        model: expertiseModel,
                        attributes: ['id'],
                        through: {
                            attributes: []
                        }
                    },
                    where: wheres
                });
            if (!result) {
                return resolve(404);
            }
            return resolve(result);
        } catch (err) {
            reject(err);
        }
    });
};

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
    getFiltered: ({ query, expertiseIds, showPending, showPendingValue }) => {
        let expertiseWheres = {};

        if (expertiseIds && expertiseIds.length > 0) {
            let idWheres = [];
            expertiseIds.forEach(id => {
                idWheres.push({id: id});
            });
            expertiseWheres = {[Op.or]: idWheres};
        }
        return new Promise(async (resolve, reject) => {
            let dieticianIds = [];
            // first we must find dietician id:s 
            // (only returns matching expertises, so if dietician has expertises 1, 2 and 3 and query is for expertise 1, will return only array with 1)
            try {
                const matchingDieticians = 
                    await model.findAll({
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
                                isPending: showPending
                            }
                        },
                        attributes: ['id'],
                        include: {
                            model: expertiseModel,
                            where: expertiseWheres,
                            required: true
                        },
                    });
                matchingDieticians.forEach(dietician => {
                    dieticianIds.push(dietician.id);
                });
                
                // define attributes that model returns
                let attributes = ['id', 'name', 'education', 'place', 'email', 'phone', 'imageUrl'];
                if (showPendingValue) attributes.push('isPending');

                // no we find all and include every expertise
                const result =
                    await model.findAll({
                        where: {
                            id: dieticianIds
                        },
                        attributes: attributes,
                        include: {
                            model: expertiseModel,
                            attributes: ['id'],
                            through: {
                                attributes: []
                            }
                        },
                    });
                return resolve(result);
            } catch (err) {
                return reject(err);
            }
        });

    },
    getOne: getOne,

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

    update: ({ id, updateObj }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await model.update(updateObj, { where:{id:id} });
                if (result == 1) {
                    const updatedDietician = await getOne({id: id});
                    return resolve(updatedDietician);
                }
                return resolve(404);
            } catch (e) {
                reject(e);
            }
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