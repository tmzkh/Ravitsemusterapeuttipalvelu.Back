//const assert = require('assert');

const Sequelize = require('sequelize');

const { assert } = require('chai');

const customerController = require('../../controllers/customerController');

let createdCustomer = {};
const name = "Tommi";
const modifiedName = "Tommy";
const email = "tommi.hyvarinen@email.com"

describe('Customer controller', () => {
    describe('create', () => {
        it ('should reject create with wrong kind of email', () => {
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
        });

        it('should create with correct infromation without problems', () => {
            return customerController.create({
                name: name, 
                email: email
            }).then(result => {
                
                createdCustomer = result;
            });
        });
    });

    describe('', () => {
        it('', () => {

        }); 
        it('', () => {

        }); 
    });
    describe('', () => {
        it('', () => {

        }); 
        it('', () => {

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
            createdCustomer = JSON.parse(createdCustomer);
            return customerController
                .delete(createdCustomer['id'])
                .then(() => {});
        }); 
    });
});