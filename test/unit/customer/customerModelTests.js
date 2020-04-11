const { assert } = require('chai');
const customerModel = require('../../../models/customer');

let createdCustomer = {};
const name = "Tommi";
const modifiedName = "Tommy";
const email = "tommi.hyvarinen@email.com"


describe('Customer model', async () => {
    /**
     * test customer creation
     */
    describe('create', () => {
        it('should create user without errors', () => {
            return customerModel.create({
                name: name,
                email: email
            }).then((result) => {
                createdCustomer = result;
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
        it('should find with id without errors', () => {
            return customerModel.findByPk(createdCustomer.id)
            .then((result) => {
                foundCustomer = result;
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
        it('should find all without errors', () => {
            return customerModel.findAll()
            .then((result) => {
                result.forEach(c => {
                    allCustomers.push(c);
                });
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
        it('should update without errors', () => {
            return customerModel.update(
                { name: modifiedName }, 
                { where: { id:createdCustomer.id }}
            ).then((result) => {

            });
        });

        it('updated customer should not have same name but other values should be same', () => {
            return customerModel.findByPk(createdCustomer.id)
            .then((result) => {
                assert.notEqual(result.name, name);
                assert.equal(result.email, email);
            });
        });
    });

    /**
     * test deleting customer
     */
    describe('delete', () => {
        it('should delete without errors', () => {
            return customerModel.destroy({ 
                where: { id: createdCustomer.id }
            }).then(() => {

            });
        });
    });
});
