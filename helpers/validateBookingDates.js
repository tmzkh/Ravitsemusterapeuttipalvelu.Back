const moment = require('moment');

module.exports = (query) => {
    let datesAreValid = true;
    let dateErrors = {};

    if (! query.startDate) {
        dateErrors.startDate = "Start date is required";
        datesAreValid = false;
    } else {
        let sd = moment(query.startDate, 'YYYY-MM-DD', true).format('YYYY-MM-DD HH:mm');
        if (sd == 'Invalid date') {
            dateErrors.startDate = "Invalid date formatting. Must be 'YYYY-MM-DD'";
            datesAreValid = false;
        } else {
            query.startDate = sd;
        }
    }
    
    if (! query.endDate) {
        dateErrors.endDate = "End date is required";
        datesAreValid = false;
    } else {
        let sd = moment(query.endDate, 'YYYY-MM-DD', true).format('YYYY-MM-DD HH:mm');
        if (sd == 'Invalid date') {
            dateErrors.endDate = "Invalid date formatting. Must be 'YYYY-MM-DD'";
            datesAreValid = false;
        } else {
            query.endDate = sd;
        }
    }

    return { dateErrors, datesAreValid };
        
}