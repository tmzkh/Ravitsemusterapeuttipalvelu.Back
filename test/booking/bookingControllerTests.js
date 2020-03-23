const { assert } = require('chai');
const bookingController = require('../../controllers/bookingController');
const Sequelize = require('sequelize');
let exs;

let createdBooking = {};

const dietId = "9b2a7778-73aa-4841-8a31-f88f6be268bf";
const custId = "efb936eb-19d5-47fd-9ba6-56d6b1c2baa0";
const startsAt = "2020-03-01T12:15:00.000Z";
const endsAt = "2020-03-01T12:30:00.000Z";
const description = "Gluteeniton ruokavalio"
const modifiedStartsAt = "2020-03-02T12:15:00.000Z";
const modifiedEndsAt = "2020-03-02T12:30:00.000Z";

describe('Booking controller', () => {
    describe('create', () => {
        /*it ('should reject create with wrong kind of email', () => {
            return customerController.create({
                name: name, 
                email: "email"
            }).then(() => {},
            err => assert.instanceOf(err, Sequelize.ValidationError));
        });

        it ('should reject create without name', () => {
            return customerController.create({
                email: name
            }).then(() => {},
            err => assert.instanceOf(err, Sequelize.ValidationError));
        });*/

        it('should create with correct infromation without problems', () => {
            return bookingController.create({
                customerId: custId,
                dieticianId: dietId,
                startsAt: startsAt,
                endsAt: endsAt,
                description: description
            }).then(result => {
                createdBooking = JSON.parse(result);
            });
        });

        it('name and email should match', () => {
            assert.equal(createdBooking.dieticianId, dietId, "dieticianId does not match");
            assert.equal(createdBooking.customerId, custId, "customerId does not match");
            assert.equal(createdBooking.startsAt, startsAt, "start date does not match");
            assert.equal(createdBooking.endsAt, endsAt, "end date does not match");
            assert.equal(createdBooking.description, description, "description does not match");
        }); 
    });

    /*describe('get', () => {
        describe('get()', () => {
            let allCustomers;
            it('should get all without problems', async () => {
                allCustomers = await customerController.getAll()
            }); 
            it('allCustomers count should be atleast 1', () => {
                assert.isAtLeast(allCustomers.length, 1, "count is 0 for some reason")
            }); 
        });
        describe('getOne()', () => {
            let foundCustomer;
            
            it('should resolve 404 with wrong id', async () => {
                const result = await customerController.getOne({id: 'cda3b043-d14c-44f3-88c4-31de0508bf56'});
                assert.equal(result, 404);
            }); 

            it('should get one with existing id without problems', async () => {
                foundCustomer = JSON.parse(await customerController.getOne({id: createdCustomer.id}));
            });
            it('found customer should match with created one', () => {
                assert.equal(foundCustomer.id, createdCustomer.id, "id does not match");
                assert.equal(foundCustomer.name, createdCustomer.name, "name does not match");
                assert.equal(foundCustomer.email, createdCustomer.email, "email does not match");
            }); 
        });
        
        
    });
    describe('update', () => {
        let modifiedCustomer;

        it('should resolve 404 with wrong id', async () => {
            const result = await customerController.update({
                id: 'cda3b043-d14c-44f3-88c4-31de0508bf56',
                name: modifiedName,
                email: createdCustomer.email
            })
            assert.equal(result, 404);
        }); 

        it('should update without problems', async () => {
            modifiedCustomer = 
                JSON.parse(
                    await customerController.update({
                        id: createdCustomer.id,
                        name: modifiedName,
                        email: createdCustomer.email
                    }));
        }); 
        it('name should not be same anymore', () => {
            assert.notEqual(modifiedCustomer.name, createdCustomer.name);
        }); 
        it('email should be still same', () => {
            assert.equal(modifiedCustomer.email, createdCustomer.email);
        }); 
    });
    describe('delete', () => {
        it('should not delete with wrong id', () => {
            return customerController
                    .delete('cda3b043-d14c-44f3-88c4-31de0508bf56')
                    .then(() => {},
                    err => assert.instanceOf(err, Error));
        });

        it('should delete with correct id without problems', () => {
            return customerController
                .delete(createdCustomer['id'])
                .then(() => {});
        }); 
    });*/
});