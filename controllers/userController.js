
const User = require('../models/user');
const Dietician = require('../models/dietician');
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
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

const create = ({username, password, dieticianId, roleId}) => {
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    return new Promise(async (resolve, reject) =>{
        try {
            //console.log(username, password, dieticianId, roleId);
            const user = 
                await User.create({
                    username: username, 
                    password: password,
                    dieticianId: dieticianId, 
                    roleId: roleId
                });
            resolve({
                id: user.id,
                username: user.username,
                dieticianId: dieticianId, 
                roleId: roleId
            });
        } catch (error) {
            reject(error);
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
                resolve(await get({id: id, username: null}));
            reject(404);
        } catch (error) {
            reject(error);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = 
                await User.destroy({ where: { id: id } });
                if (result == 1)
                    resolve();
                resolve(404);
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
    if (id) {
        return [{
            model: Dietician,
            attributes: ['id'],
            as: 'dietician',
            required: false
        }];
    }
    return [];
};

module.exports = {
    get,
    create,
    update,
    delete: deleteUser,
};