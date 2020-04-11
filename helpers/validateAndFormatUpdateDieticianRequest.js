
const expertisesArrayValidator = require('./validateAndFormatExpertisesArray');

module.exports = ({ body, auth }) => {
    let updateObj = {};

    if (auth.role == 'admin') {
        console.log(body, );
        
        if (body.isPending != 'undefined' && (body.isPending == true || body.isPending == false)) {
            updateObj.isPending = body.isPending;
        } else {
            return { error: { isPending: "Is pending value is required" } };
        }
    } else if (auth.role == 'dietician' && auth.dieticianId == body.id) {
        if (body.name) updateObj.name = body.name;
        if (body.education) updateObj.education = body.education;
        if (body.place) updateObj.place = body.place;
        // if (body.email) updateObj.email = body.email;
        if (body.phone) updateObj.phone = body.phone;
        if (body.imageUrl) updateObj.imageUrl = body.imageUrl;
        if (body.expertises) {
            console.log("validator, body.exarr", body.expertises);
            const { 
                error, 
                expertises 
            } = expertisesArrayValidator(body.expertises);
            if (error) {
                return { error: error };
            } else {
                updateObj.expertises = expertises;
            }
        }
    } else {
        return { error: "unauthorized" };
    }

    return { updateObj };
}