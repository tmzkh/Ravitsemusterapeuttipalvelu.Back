let assert = require('assert');
const bookingModel = require('../../models/booking');

let createdBooking = {};

const dietId = "9b2a7778-73aa-4841-8a31-f88f6be268bf";
const custId = "efb936eb-19d5-47fd-9ba6-56d6b1c2baa0";
const startsAt = new Date("2020-03-01T12:15:00.000Z");
const endsAt = new Date("2020-03-01T12:30:00.000Z");
const description = "Gluteeniton ruokavalio"
const modifiedStartsAt = new Date("2020-03-02T12:15:00.000Z");
const modifiedEndsAt = new Date("2020-03-02T12:30:00.000Z");

describe('Booking model', async () => {
    /**
     * test booking creation
     */
    describe('create', () => {
        it('should create booking without errors', (done) => {
            bookingModel.create({
                customerId: custId,
                dieticianId: dietId,
                startsAt: startsAt,
                endsAt: endsAt,
                description: description,
                endsAt: endsAt
            }).then((result) => {
                createdBooking = result;
                done();
            }).catch((err) => {
                done(err);
            });
        });

        it('customerId should be still same', () => {
            assert.equal(createdBooking.customerId, custId);
        });
        it('dieticianId should be still same', () => {
            assert.equal(createdBooking.dieticianId, dietId);
        });
        it('start and end times should be still same', () => {
            assert.equal(createdBooking.startsAt, startsAt);
            assert.equal(createdBooking.endsAt, endsAt);
        });
        it('id should not be null', () => {
            assert.notEqual(createdBooking.id, null);
        });
    });

    /*
     * test finding one booking
     */
    describe('find one', () => {
        let foundBooking = {};
        it('should find with id without errors', (done) => {
            bookingModel.findByPk(createdBooking.id)
                .then((result) => {
                    foundBooking = result;
                    done();
                }).catch((err) => {
                    done(err);
                });
        });

        it('should be equal with created', () => {
            assert.equal(foundBooking.id, createdBooking.id);
            assert.equal(foundBooking.customerId, custId);
            assert.equal(foundBooking.dieticianId, dietId);
        });
    });

    /*
     * test finding all bookings
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
     * test updating booking
     */
    describe('update', () => {
        it('should update without errors', (done) => {
            bookingModel.update(
                {
                    startsAt: modifiedStartsAt,
                    endsAt: modifiedEndsAt
                },
                { where: { id: createdBooking.id } }
            ).then((result) => {
                done();
            }).catch((err) => {
                done(err);
            });
        });

        it('updated booking should not have same start and end dates but other values should be same', (done) => {
            bookingModel.findByPk(createdBooking.id)
                .then((result) => {
                    assert.notEqual(result.startsAt, startsAt);
                    assert.notEqual(result.endsAt, endsAt)
                    assert.equal(result.dieticianId, dietId);
                    assert.equal(result.customerId, custId);
                    assert.equal(result.description, description);
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
                where: { id: createdBooking.id }
            }).then(() => {
                done();
            })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
