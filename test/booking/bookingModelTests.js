let assert = require('assert');
const bookingModel = require('../../models/booking');

let createdCustomer = {};
const name = "Tommi";
const modifiedName = "Tommy";
const email = "tommi.hyvarinen@email.com"


describe('Booking model', async () => {
    /**
     * test customer creation
     */
    describe('create', () => {
        it('should create user without errors', (done) => {
            bookingModel.create({
                name: name,
                email: email
            }).then((result) => {
                createdCustomer = result;
                done();
            }).catch((err) => {
                done(err);
            });
        });

        it('name should be still same', () => {
            assert.equal(createdCustomer.name, name);
        });
        it('email should be still same', () => {
            assert.equal(createdCustomer.email, email);
        });
        it('id should not be null', () => {
            assert.notEqual(createdCustomer.id, null);
        });
    });

    /**
     * test finding one customer
     */
    describe('find one', () => {
        let foundCustomer = {};
        it('should find with id without errors', (done) => {
            bookingModel.findByPk(createdCustomer.id)
            .then((result) => {
                foundCustomer = result;
                done();
            }).catch((err) => {
                done(err);
            });
        });

        it('should be equal with created', () => {
            assert.equal(foundCustomer.id, createdCustomer.id);
            assert.equal(foundCustomer.name, name);
            assert.equal(foundCustomer.email, email);
        });
    });

    /**
     * test finding all customers
     */
    describe('find all', () => {
        let allCustomers = [];
        it('should find all without errors', (done) => {
            bookingModel.findAll()
            .then((result) => {
                result.forEach(c => {
                    allCustomers.push(c);
                });
                done();
            }).catch((err) => {
                done(err);
            });
        });

        it('array of customer should not be 0', () => {
            assert.notEqual(allCustomers.length, 0);
        });
    });

    /**
     * test updating customer
     */
    describe('update', () => {
        it('should update without errors', (done) => {
            bookingModel.update(
                { name: modifiedName }, 
                { where: { id:createdCustomer.id }}
            ).then((result) => {
                done();
            }).catch((err) => {
                done(err);
            });
        });

        it('updated customer should not have same name but other values should be same', (done) => {
            bookingModel.findByPk(createdCustomer.id)
            .then((result) => {
                assert.notEqual(result.name, name);
                assert.equal(result.email, email);
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });

    /**
     * test deleting customer
     */
    describe('delete', () => {
        it('should delete without errors', (done) => {
            bookingModel.destroy({ 
                where: { id: createdCustomer.id }
            }).then(() => {
                done();
            })
            .catch((err) => {
                done(err);
            });
        });
    });
});
