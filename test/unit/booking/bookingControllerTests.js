const { assert } = require('chai');
const bookingController = require('../../../controllers/bookingController');
const dieticianModel = require('../../../models/dietician');
const customerModel = require('../../../models/customer');
const Sequelize = require('sequelize');
let exs;

const moment = require('moment');

let createdBooking = {};

let dietId;
let custId;
const startsAt = "2018-09-01T12:15:00.000Z";
const endsAt = "2018-09-01T12:30:00.000Z";
const description = "Gluteeniton ruokavalio"
const modifiedStartsAt = "2018-03-02T12:15:00.000Z";
const modifiedEndsAt = "2018-03-02T12:30:00.000Z";


describe('Booking controller', async () => {

    before(async () => {
        await generateDummyDataForTests();
    });

    describe('create', () => {
        it('should create with correct infromation without problems', async () => {
            const result = await bookingController.create({
                customerId: custId,
                dieticianId: dietId,
                startsAt: startsAt,
                endsAt: endsAt,
                description: description
            });
            createdBooking = result;
        });

        it('name and email should match', () => {
            assert.equal(createdBooking.dieticianId, dietId, "dieticianId does not match");
            assert.equal(createdBooking.customerId, custId, "customerId does not match");
            assert.equal(moment(createdBooking.startsAt).format('YYYY-MM-DD HH:mm'), moment(startsAt).format('YYYY-MM-DD HH:mm'), "start date does not match");
            assert.equal(moment(createdBooking.endsAt).format('YYYY-MM-DD HH:mm'), moment(endsAt).format('YYYY-MM-DD HH:mm'), "end date does not match");
            assert.equal(createdBooking.description, description, "description does not match");
        }); 
    });

    describe('delete', () => {
        it('should not delete with wrong id', async () => {
            try {
                await bookingController
                    .delete('cda3b043-d14c-44f3-88c4-31de0508bf56');
            }
            catch (err) {
                return assert.instanceOf(err, Error);
            }
        });

        it('should delete with correct id without problems', async () => {
            await bookingController
                .delete(createdBooking.id);
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
        email: 'email@email.com',
        phone: '123456',
        imageUrl: 'https://freesvg.org/img/1316090534.png',
        isPending: false
    });
    dietId = dietician.id;

    const customer = await customerModel.create({
        name: 'customer name',
        email: 'customer@email.com'
    });
    custId = customer.id;
};

const deleteDummyData = async () => {
    await dieticianModel.destroy({where: {id: dietId}});
    await customerModel.destroy({where: {id: custId}});
};
