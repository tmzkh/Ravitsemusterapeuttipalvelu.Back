
const { assert } = require('chai');

const userController = require('../../controllers/userController');
const dieticianModel = require('../../models/dietician');

const bcrypt = require('bcrypt');

let dieticianUser,
    dieticianId,
    dieticianUsername;

const firstPwd = 'V3ry-Str0ng_P#d';

const secondPwd = 'password123';



describe('User controller', async () => {

    before(async () => {
        await generateDummyDataForTests();
    });

    describe('create', () => {
        it('should create with correct information without problems', async () => {
            dieticianUser = 
                await userController.create({
                    username: dieticianUsername,
                    password: firstPwd,
                    dieticianId: dieticianId,
                    roleId: 2
                });
        });

        it('should return same username, dieticianId and roleId', () => {
            assert.equal(dieticianUser.username, dieticianUsername, 'username does not match');
            assert.equal(dieticianUser.dieticianId, dieticianId, 'dieticianId does not match');
            assert.equal(dieticianUser.roleId, 2, 'roleId does not match');
        }); 
    });

    describe('delete', () => {
        it('should not delete with wrong id', async () => {
            try {
                await userController
                    .delete('cda3b043-d14c-44f3-88c4-31de0508bf56');
            }
            catch (err) {
                return assert.instanceOf(err, Error);
            }
        });

        it('should delete with correct id without problems', async () => {
            await userController
                .delete(dieticianUser.id);
        }); 
    });

    after(async () => {
        await deleteDummyData();
    });
});

const generateDummyDataForTests = async () => {
    const dietician = 
        await dieticianModel.create({
            name: 'dietician name', 
            education: 'asdf',
            place: 'asdf',
            email: 'dietician@dieticianservice.com',
            phone: '123456',
            imageUrl: 'https://freesvg.org/img/1316090534.png',
            isPending: false
        });
    dieticianId = dietician.id;
    dieticianUsername = dietician.email;
};

const deleteDummyData = async () => {
    await dieticianModel.destroy({where: {id: dieticianId}});
};
