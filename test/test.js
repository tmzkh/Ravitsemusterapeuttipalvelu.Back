/**
 * Top-level test-file, calls tests from other files
 */

process.env.NODE_ENV = 'test'

describe('unit', () => {
    describe('customer', () => {
        require('./unit/customer/customerModelTests');
        require('./unit/customer/customerControllerTests');
    });

    describe('expertise', () => {
        require('./unit/expertise/expertiseControllerTests');
    });

    describe('dietician', () => {
        require('./unit/dietician/dieticianModelTests');
        require('./unit/dietician/dieticianControllerTests');
    });

    describe('booking', () => {
        require('./unit/booking/bookingControllerTests');
    });

    describe('user', () => {
        require('./unit/user/userControllerTests');
    });
});

describe('feature', () => {
    describe('dietician', () => {
        require('./feature/dietician/dieticianRoutes');
    });
});