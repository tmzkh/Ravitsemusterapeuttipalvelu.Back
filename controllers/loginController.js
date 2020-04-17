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
            try {
                resolve(await Login.findOne({ where: where }));
            } catch (e) {
                reject(e);
            }
        });
    },
    create: async (userId) => {
        return new Promise(async (resolve, reject) => {
            const token = require('crypto')
                .randomBytes(48).toString('hex');
            try {
                const result = 
                    await Login.create({userId: userId, accessToken: token});
                return resolve(result);
            } catch (e) {
                return reject(e);
            }
        });
    },
    updateToken: async (token) => {
        return new Promise(async (resolve, reject) => {
            const newToken = require('crypto')
                .randomBytes(48).toString('hex');

            try {
                const result = 
                    await Login.update(
                        { accessToken: newToken }, 
                        { where: { accessToken: token } });
                if (result == 1)
                    return resolve(newToken);
                return reject();
            } catch (e) {
                return reject(e);
            }
        });
    },
    updateTimestampOnly: async (token) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = 
                    await Login.update(
                        {accessToken: token}, {where: {accessToken: token}}
                    );
                if (result == 1)
                    return resolve(token);
                
                return resolve(404);
            } catch (e) {
                return reject(e);
            }
        });
    },
    delete: async ({userId, token}) => {
        return new Promise(async (resolve, reject) => {
            const where = wheres({userId, token});
            try {
                const result = await Login.destroy({ where: where });
                if (result == 1) {
                    return resolve();
                }
                return reject(404);
            } catch (e) {
                return reject(e);
            }
        });
    }
};