
const User = require('../models/user');
const Dietician = require('../models/dietician');

const bcrypt = require('bcrypt');

const pwdForFakeTest = '$2b$10$lZ/ekZv2LkfIvvL9K3WACuLn9b.OkMq4.ufISwu3S/MxxGRpqQRne';

const generateWheres = ({id, username, password}) => {
    if (id) {
        return { id: id };
    }
    return {
        username: username
    };
}

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
} 

module.exports = {
    get: ({id, username, password}) => {
        return new Promise(async (resolve, reject) => {
            const wheres = generateWheres({id, username, password});
            const includes = generateIncludes(id);
            let user = await User.findOne({
                where: wheres,
                include: includes
            });

            if (! id ) {
                if (user && user.password) {
                    if ( ! await bcrypt.compare(password, user.password) ) {
                        user = null;
                    }
                } else {
                    await bcrypt.compare('T3hd4antest1', pwdForFakeTest);
                }
            }
            resolve(user);
        });
    }
};