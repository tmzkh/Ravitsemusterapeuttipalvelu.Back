const UserController = require('./userController');
const LoginController = require('./loginController');

const bcrypt = require('bcrypt');

const pwdForFakeTest = '$2b$10$lZ/ekZv2LkfIvvL9K3WACuLn9b.OkMq4.ufISwu3S/MxxGRpqQRne';

module.exports = {
    login: async ({username, password}) => {
        return new Promise(async (resolve, reject) => {
            try {
                // fetch user from db
                let user= await UserController.get({
                    id: null,
                    username: username,
                }).catch(err => {
                    console.log('catch', err);
                });


                if (user && user.password) {
                    if ( ! await bcrypt.compare(password, user.password) ) {
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
                    // if not previous login-object, create it
                    login = await LoginController.create(userId);
                } else if (login && user) {
                    // if there is previous login, update it
                    const newToken = 
                        await LoginController.updateToken(login.accessToken)
                            .catch(err => console.log(err));
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
                return reject(401);
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
    } 
}