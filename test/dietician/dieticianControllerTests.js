//const assert = require('assert');

const Sequelize = require('sequelize');

const { assert } = require('chai');

const dieticianController = require('../../controllers/dieticianController');

let createdDietician = {};
const name = "Tero";
const modifiedName = "Turo";
const education = "Koulu";
const place = "Kuopio";
const email = "tero@mail.com";
const phone = "123456";
const imageUrl = "https://freesvg.org/img/1316090534.png";
const isPending = true;

describe('Dietician controller', () => {
    describe('create', () => {
        it ('should reject create with wrong kind of email', () => {
            return dieticianController.create({
                name: name, 
                email: "email"
            }).then(() => {},
            err => assert.instanceOf(err, Sequelize.ValidationError));
        });

        it ('should reject create without name', () => {
            return dieticianController.create({
                email: name
            }).then(() => {},
            err => assert.instanceOf(err, Sequelize.ValidationError));
        });

        it('should create with correct infromation without problems', () => {
            return dieticianController.create({
                name: name, 
                education: education,
                place: place,
                email: email,
                phone: phone,
                imageUrl: imageUrl,
                isPending: isPending
            }).then(result => {
                createdDietician = JSON.parse(result);
            });
        });

        it('name and email should match', () => {
            assert.equal(createdDietician.name, name, "name does not match");
            assert.equal(createdDietician.email, email, "email does not match");
        }); 
    });

    describe('get', () => {
        describe('getAll()', () => {
            let allDieticians;
            it('should get all without problems', async () => {
                allDieticians = await dieticianController.getAll()
            }); 
            it('allCustomers count should be atleast 1', () => {
                assert.isAtLeast(allDieticians.length, 1, "count is 0 for some reason")
            }); 
        });
        describe('getOne()', () => {
            let foundDietician;
            
            it('should resolve 404 with wrong id', async () => {
                const result = await dieticianController.getOne({id: 'cda3b043-d14c-44f3-88c4-31de0508bf56'});
                assert.equal(result, 404);
            }); 

            it('should get one with existing id without problems', async () => {
                foundDietician = JSON.parse(await dieticianController.getOne({id: createdDietician.id}));
            });
            it('found customer should match with created one', () => {
                assert.equal(foundDietician.id, createdDietician.id, "id does not match");
                assert.equal(foundDietician.name, createdDietician.name, "name does not match");
                assert.equal(foundDietician.email, createdDietician.email, "email does not match");
            }); 
        });
        
        
    });
    describe('update', () => {
        let modifiedDietician;

        it('should resolve 404 with wrong id', async () => {
            const result = await dieticianController.update({
                id: 'cda3b043-d14c-44f3-88c4-31de0508bf56',
                name: modifiedName,
                email: createdDietician.email
            })
            assert.equal(result, 404);
        }); 

        it('should update without problems', async () => {
            modifiedDietician = 
                JSON.parse(
                    await dieticianController.update({
                        id: createdDietician.id,
                        name: modifiedName,
                        email: createdDietician.email
                    }));
        }); 
        it('name should not be same anymore', () => {
            assert.notEqual(modifiedDietician.name, createdDietician.name);
        }); 
        it('email should be still same', () => {
            assert.equal(modifiedDietician.email, createdDietician.email);
        }); 
    });
    describe('delete', () => {
        it('should not delete with wrong id', () => {
            return dieticianController
                    .delete('cda3b043-d14c-44f3-88c4-31de0508bf56')
                    .then(() => {},
                    err => assert.instanceOf(err, Error));
        });

        it('should delete with correct id without problems', () => {
            return dieticianController
                .delete(createdDietician['id'])
                .then(() => {});
        }); 
    });
});