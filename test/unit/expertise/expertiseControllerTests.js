const { assert } = require('chai');
const expertiseController = require('../../../controllers/expertiseController');

let exs;

describe('expertise controller', () => {
    describe('get all', async () => {
        it('should fetch all without errors', async () => {
            exs = await expertiseController.getAll();
            //console.log(exs);
        });

        it('results should not be null or length 0', () => {   
            assert.notEqual(exs, null);
            assert.notEqual(exs.length, 0);
        })
    });
});