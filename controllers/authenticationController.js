const Login = require('../models/login');
const User = require('../models/user');
const Dietician = require('../models/dietician');

const bcrypt = require('bcrypt');

module.exports = {
    login: async ({username, password}) => {
        const user = await User.findOne({
            where: {
                userName: username
            },
            include: {
                model: Dietician,
                as: 'dietician',
                required: false
            }
        });

        return await bcrypt.compare(password, user.password);

        console.log(username, password, user);
    }
};