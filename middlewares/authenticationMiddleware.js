const LoginController = require('../controllers/loginController');
const UserController = require('../controllers/userController');
const moment = require('moment');


module.exports = async (req, res, next) => {
    // clear auth obj
    req.authentication = null;

    // get token from headers
    const token = req.headers['accesstoken'];

    // if no token, continue as unauthenticated
    if ( ! token ) {
        return next();
    }

    // try to fetch login from db based on token
    const login = 
        await LoginController
            .get({userId: null, token: token})
            .catch(err => {
                return null;
            });

    // if login equals null, continue as unauthenticated
    if ( ! login ) {
        return res
            .status(401)
            .send({
                errors: {
                    accesstoken: 'Invalid access token'
                }
            });
    }

    const lastMomentToUseToken = moment(login.updatedAt).add(1, 'hours');

    // if token is updated over an hour ago, it is expired and it is not valid
    if ( moment().isAfter(lastMomentToUseToken.format('YYYY-MM-DD HH:mm')) ) {
        res.status(401)
            .send({
                errors: {
                    accesstoken: 'Invalid access token'
                }
            });

        
        await LoginController.delete({
            userId: null,
            token: token
        });

        return;
    }


    await LoginController.updateTimestampOnly(token);

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
                errors: {
                    accesstoken: 'Invalid access token'
                }
            });
    }

    req.authentication = {
        accesstoken: token,
        userId: user.id,
        dieticianId: user.dietician 
            ? user.dietician.id
            : null
    };

    next();
}