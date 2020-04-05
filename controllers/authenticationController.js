const UserController = require('./userController');
const LoginController = require('./loginController');

module.exports = {
    login: async ({username, password}) => {
        return new Promise(async (resolve, reject) => {
            // fetch user from db
            const user = 
                await UserController.get({
                    id: null,
                    username: username,
                    password: password
                }).catch(err => {
                    console.log('catch', err);
                });

            // extract userId
            const userId = user ? user.id : '';

            // fetch login-object from db if exists
            const login = 
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
                    login.accessToken;
                }
            }

            if (login) {
                return resolve(
                    JSON.stringify({
                        AccessToken: login.accessToken,
                        TTL: 3600
                    })
                );
            }
            return reject(401);
        });
    }
}