
const validateBookingDates = require('./validateBookingDates');

module.exports = (query) => {
    let isValid = true;
    let errors = {};
    const exp = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);

    if (! query.dieticianId && !query.customerId) {
        errors.dieticianId = "Dietician id or customer id is required";
        errors.customerId = "Dietician id or customer id is required";
        isValid = false;
    }

    if (query.dieticianId && !exp.test(query.dieticianId)) {
        errors.dieticianId = "Id must be UUID";
        isValid = false;
    }

    if (query.customerId && ! exp.test(query.customerId)) {
        errors.customerId = "Id must be UUID";
        isValid = false;
    }

    const { dateErrors, datesAreValid } = validateBookingDates(query);

    console.log(dateErrors, datesAreValid);

    for (const key in dateErrors) {
        if (dateErrors.hasOwnProperty(key)) {
            errors[key] = dateErrors[key];
        }
    }

    isValid = isValid && datesAreValid;

    return { errors, isValid };
        
}