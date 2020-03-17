const moment = require('moment');

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


    if (! query.startDate) {
        errors.startDate = "Start date is required";
        isValid = false;
    } else {
        let sd = moment(query.startDate, 'YYYY-MM-DD', true).format('YYYY-MM-DD HH:mm');
        if (sd == 'Invalid date') {
            errors.startDate = "Invalid date formatting. Must be 'YYYY-MM-DD'";
            isValid = false;
        } else {
            query.startDate = sd;
        }
    }
    
    if (! query.endDate) {
        errors.endDate = "End date is required";
        isValid = false;
    } else {
        let sd = moment(query.endDate, 'YYYY-MM-DD', true).format('YYYY-MM-DD HH:mm');
        if (sd == 'Invalid date') {
            errors.endDate = "Invalid date formatting. Must be 'YYYY-MM-DD'";
            isValid = false;
        } else {
            query.endDate = sd;
        }
    }

    return { errors, isValid };
        
}