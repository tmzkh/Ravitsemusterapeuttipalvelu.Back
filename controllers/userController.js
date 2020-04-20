
const User = require('../models/user');
const Dietician = require('../models/dietician');
const Role = require('../models/role');
const bcrypt = require('bcrypt');

const get = ({id, username}) => {
    return new Promise(async (resolve, reject) => {
        const wheres = generateWheres({id, username});
        const includes = generateIncludes(id);
        try {
            const user = await User.findOne({
                where: wheres,
                include: includes
            });
            return resolve(user);
        } catch (error) {
            return reject(error);
        }
    });
};

const create = ({username, password, dieticianId, roleId}) => {
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    return new Promise(async (resolve, reject) =>{
        try {
            const user = 
                await User.create({
                    username: username, 
                    password: password,
                    dieticianId: dieticianId, 
                    roleId: roleId
                });
            return resolve({
                id: user.id,
                username: user.username,
                dieticianId: dieticianId, 
                roleId: roleId
            });
        } catch (error) {
            return reject(error);
        }
    });
};

const update = ({id, username, password}) => {
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    return new Promise(async (resolve, reject) =>{
        try {
            const result = 
                await User.update({
                    username: username, 
                    password: password,
                }, 
                { where: { id: id } });
            if (result == 1)
                return resolve(await get({id: id, username: null}));
            return resolve(404);
        } catch (error) {
            return reject(error);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = 
                await User.destroy({ where: { id: id } });
                if (result == 1)
                    return resolve();
                return resolve(404);
        } catch (error) {
            reject(error);
        }
    });
};

const generateWheres = ({id, username}) => {
    if (id) {
        return { id: id };
    }
    return { username: username };
};

const generateIncludes = (id) => {
    let includes = [];

    includes.push({
        model: Role,
        attributes: ['id', 'name'],
    });

    if (id) {
        includes.push({
            model: Dietician,
            attributes: ['id'],
            as: 'dietician',
            required: false
        });
    }
    return includes;
};

module.exports = {
    get,
    create,
    update,
    delete: deleteUser,
};