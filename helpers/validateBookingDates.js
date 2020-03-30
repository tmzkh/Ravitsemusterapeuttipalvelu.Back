const moment = require('moment');

module.exports = (query) => {
    let datesAreValid = true;
    let dateErrors = {};

    if (! query.startDate) {
        dateErrors.startDate = "Start date is required";
        datesAreValid = false;
    } else {
        let sd = moment.utc(query.startDate + ' 00:00', 'YYYY-MM-DD HH:mm', true).format('YYYY-MM-DD HH:mm');
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
        let datestr = query.endDate + ' 23:59';
        let sd = moment.utc(datestr, 'YYYY-MM-DD HH:mm', true).format('YYYY-MM-DD HH:mm');
        console.log(datestr, sd);
        if (sd == 'Invalid date') {
            dateErrors.endDate = "Invalid date formatting. Must be 'YYYY-MM-DD'";
            datesAreValid = false;
        } else {
            query.endDate = sd;
        }
    }

    return { dateErrors, datesAreValid };
        
}