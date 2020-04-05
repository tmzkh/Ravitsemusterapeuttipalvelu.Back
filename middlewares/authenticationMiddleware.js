const LoginController = require('../controllers/loginController');
const UserController = require('../controllers/userController');

module.exports = async (req, res, next) => {
    // clear auth obj
    req.authentication = null;

    // get token from headers
    const token = req.headers['accesstoken'];

    // if no token, continue as unauthenticated
    if ( ! token ) {
        return next();
    }

    console.log('authmid token', token);

    // try to fetch login from db based on token
    const login = 
        await LoginController
            .get({userId: null, token: token})
            .catch(err => {
                console.log(err);
                return null;
            });

    // if login equals null, continue as unauthenticated
    if ( ! login ) {
        return res
            .status(401)
            .send({
                error: 'Invalid access token'
            });
    }

    LoginController.updateTimestampOnly(token);

    console.log(login.userId);

    const user = 
        await UserController.get({
            id: login.userId,
            username: null,
            password: null
        });

    if ( ! user ) {
        return res
            .status(401)
            .send({
                error: 'Invalid access token'
            });
    }

    req.authentication = {
        userId: user.id,
        dieticianId: user.dietician.id
    };
    
    next();
}