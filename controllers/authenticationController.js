const UserController = require('./userController');
const LoginController = require('./loginController');
const DieticianController = require('./dieticianController');

const bcrypt = require('bcrypt');

const pwdForFakeTest = '$2b$10$lZ/ekZv2LkfIvvL9K3WACuLn9b.OkMq4.ufISwu3S/MxxGRpqQRne';

module.exports = {
    login: async ({username, password}) => {
        return new Promise(async (resolve, reject) => {
            try {
                // fetch user from db
                let user = await UserController.get({
                    id: null,
                    username: username,
                });

                if (user && user.password) {
                    // check if password matches
                    if ( ! await bcrypt.compare(password, user.password) ) {
                        // if not,set user to null
                        user = null;
                    }
                } else {
                    await bcrypt.compare('T3hd4antest1', pwdForFakeTest);
                }

                // extract userId
                const userId = user ? user.id : '';

                // fetch login-object from db if exists
                let login = 
                    await LoginController.get({
                        userId: userId,
                        token: null
                    });

                if (! login && user) {
                    // if there is not previous login-object, create it
                    login = await LoginController.create(userId);
                } else if (login && user) {
                    // if there is previous login, update it
                    const newToken = 
                        await LoginController.updateToken(login.accessToken);
                    if (newToken) {
                        login.accessToken = newToken;
                    } else {
                        login.accessToken = null;
                    }
                }

                if (login) {
                    return resolve({
                        AccessToken: login.accessToken,
                        TTL: 3600,
                        dieticianId: user.dieticianId
                    });
                }
                return resolve(401);
            } catch (error) {
                reject(error);
            }
        });
    },

    logout: async (token) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = 
                    await LoginController.delete({
                        userId: null,
                        token: token
                    });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },

    register: async (body) => {
        return new Promise(async (resolve, reject) => {
            let dieticianId = null;
            let userId = null;
            try {
                const dietician = await DieticianController.create(body);
                dieticianId = dietician.id;
                const user = 
                    await UserController.create({
                        username: dietician.email,
                        password: body.password,
                        dieticianId: dietician.id,
                        roleId: 2
                    });
                userId = user.id;
                resolve({
                    user: {
                        username: user.username
                    },
                    dietician: dietician
                });
            } catch (e) {
                reject(e);
                try {
                    await DieticianController.delete(dieticianId);
                    await UserController.delete(userId);
                } catch (er) {
                    console.log('registration, tried to delete created entities', er);
                }
            }
        });
    }
}