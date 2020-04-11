const { assert } = require('chai');
const dieticianModel = require('../../../models/dietician');

let createdDietician = {};
const name = "Tero";
const modifiedName = "Turo";
const education = "Koulu";
const place = "Kuopio";
const email = "tero@mail.com";
const phone = "123456";
const imageUrl = "https://freesvg.org/img/1316090534.png";
const isPending = true;


describe('Dietician model', async () => {
    /**
     * test customer creation
     */
    describe('create', () => {
        it('should create dietician without errors', () => {
            return dieticianModel.create({
                name: name,
                education: education,
                place: place,
                email: email,
                phone: phone,
                imageUrl: imageUrl,
                isPending: isPending
            }).then((result) => {
                createdDietician = result;
            });
        });

        it('name should be still same', () => {
            assert.equal(createdDietician.name, name);
        });
        it('education should be still same', () => {
            assert.equal(createdDietician.education, education);
        });
        it('place should be still same', () => {
            assert.equal(createdDietician.place, place);
        });
        it('email should be still same', () => {
            assert.equal(createdDietician.email, email);
        });
        it('phone should be still same', () => {
            assert.equal(createdDietician.phone, phone);
        });
        it('imageUrl should be still same', () => {
            assert.equal(createdDietician.imageUrl, imageUrl);
        });
        it('isPending should be still same', () => {
            assert.equal(createdDietician.isPending, isPending);
        });
        it('id should not be null', () => {
            assert.notEqual(createdDietician.id, null);
        });
    });

    /**
     * test finding one customer
     */
    describe('find one', () => {
        let foundDietician = {};
        it('should find with id without errors', () => {
            return dieticianModel.findByPk(createdDietician.id)
                .then((result) => {
                    foundDietician = result;
                });
        });

        it('should be equal with created', () => {
            assert.equal(foundDietician.id, createdDietician.id);
            assert.equal(foundDietician.name, name);
            assert.equal(foundDietician.education, education);
            assert.equal(foundDietician.place, place);
            assert.equal(foundDietician.email, email);
            assert.equal(foundDietician.phone, phone);
            assert.equal(foundDietician.imageUrl, imageUrl);
            assert.equal(foundDietician.isPending, isPending);
        });
    });

    /**
     * test finding all customers
     */
    describe('find all', () => {
        let allDieticians = [];
        it('should find all without errors', () => {
            return dieticianModel.findAll()
                .then((result) => {
                    result.forEach(c => {
                        allDieticians.push(c);
                    });
                });
        });

        it('array of dietician should not be 0', () => {
            assert.notEqual(allDieticians.length, 0);
        });
    });

    /**
     * test updating customer
     */
    describe('update', () => {
        it('should update without errors', () => {
            return dieticianModel.update(
                { name: modifiedName },
                { where: { id: createdDietician.id } }
            ).then((result) => {

            });
        });

        it('updated dietician should not have same name but other values should be same', () => {
            return dieticianModel.findByPk(createdDietician.id)
                .then((result) => {
                    assert.notEqual(result.name, name);
                    assert.equal(result.education, education);
                    assert.equal(result.place, place);
                    assert.equal(result.email, email);
                    assert.equal(result.phone, phone);
                    assert.equal(result.imageUrl, imageUrl);
                    assert.equal(result.isPending, isPending);
                });
        });
    });

    /**
     * test deleting customer
     */
    describe('delete', () => {
        it('should delete without errors', () => {
            return dieticianModel.destroy({
                where: { id: createdDietician.id }
            }).then(() => {

            });
        });
    });
});
