const { assert } = require('chai');
const expertiseController = require('../../controllers/expertiseController');

let exs;

describe('expertise controller', () => {
    describe('get all', () => {
        it('should fetch all without errors', () => {
            return expertiseController
                .getAll()
                .then(result => {
                    exs = result;
                });
        });

        it('results should not be null or length 0', () => {
            assert.notEqual(exs, null);
            assert.notEqual(exs.length, 0);
        })
    });
});