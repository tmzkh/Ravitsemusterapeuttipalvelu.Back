const model = require('../models/customer');

module.exports = {
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                return resolve(
                    await model.findAll({attributes: ['id', 'name', 'email']})
                );
            } catch (e) {
                return reject(e);
            }
        });
    },
    getOne: ({id, name, email}) => {
        let wheres = {};
        if (id) wheres.id = id;
        if (name) wheres.name = name;
        if (email) wheres.email = email;

        return new Promise(async (resolve, reject) => {
            if (! id && ! name && ! email) {
                reject(400);
            }
            try {   
                const result = 
                    await model.findOne({
                            attributes: ['id', 'name', 'email'],
                            where: wheres
                        });
                if (! result) {
                    return resolve(404);
                }
                return resolve({
                    id: result.id,
                    name: result.name,
                    email: result.email
                });
            } catch (e) {
                return reject(e);
            }
        });
    },

    create: ({name, email}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await model.create({name: name, email: email});
                return resolve({
                    id: result.id,
                    name: result.name,
                    email: result.email
                });
            } catch (e) {
                reject(e);
            }
        });
    },

    update: ({id, name, email}) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = 
                    await model.update({name: name, email: email}, { where: { id: id } });
                if (result == 1) {
                    result = await model.findByPk(id);
                    if (typeof(result) != 'undefined') {
                        return resolve({
                            id: result.id,
                            name: result.name,
                            email: result.email
                        });
                    }
                }
                return resolve(404);
            } catch (e) {
                reject(e);
            }
        });
    },

    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await model.destroy({ where: { id: id } });
                if (result == 1)
                    return resolve();
                return resolve(404);
            } catch (e) {
                return reject(e);
            }
        });
    }
};