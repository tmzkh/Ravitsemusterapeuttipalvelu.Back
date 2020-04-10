const Login = require('../models/login');

const wheres = ({userId, token}) => {
    if (userId) {
        return { userId: userId };
    }
    return { accessToken: token }
}

module.exports = {
    get: async ({userId, token}) => {
        return new Promise(async (resolve, reject) => {
            const where = wheres({userId, token});
            const login = await Login.findOne({
                where: where
            });
            resolve(login);
        });
    },
    create: async (userId) => {
        return new Promise(async (resolve, reject) => {
            const token = require('crypto')
                .randomBytes(48).toString('hex');

            const result = 
                await Login.create({
                    userId: userId,
                    accessToken: token
                });

            resolve(result);
        });
    },
    updateToken: async (token) => {
        return new Promise(async (resolve, reject) => {
            const newToken = require('crypto')
                .randomBytes(48).toString('hex');

            const result = 
                await Login.update(
                    { accessToken: newToken }, { where: { accessToken: token } });

            if (result == 1)
                return resolve(newToken);
            
            return reject();
        });
    },
    updateTimestampOnly: async (token) => {
        return new Promise(async (resolve, reject) => {
            const result = 
                await Login.update(
                    { accessToken: token }, { where: { accessToken: token } });

            if (result == 1)
                return resolve(token);
            
            return reject();
        });
    },
    delete: async ({userId, token}) => {
        return new Promise(async (resolve, reject) => {
            const where = wheres({userId, token});
            const result = 
                await Login.destroy({ where: where });
            if (result == 1) {
                resolve();
            }
            reject(404);
        });
    }
};