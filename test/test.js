/**
 * Top-level test-file, calls tests from other files
 */

/**
 * test customer related stuff
 */
describe('customer', () => {
    require('./customer/customerModelTests');
    require('./customer/customerControllerTests');
});

describe('expertise', () => {
    require('./expertise/expertiseControllerTests');
});