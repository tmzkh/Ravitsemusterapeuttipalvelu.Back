module.exports = ({ body, auth }) => {
    if (auth.role == 'admin') {
        if (body.isPending) updateObj.isPending = body.isPending;
    } else if (auth.role == 'dietician' && auth.dieticianId == params.id) {
        if (body.name) updateObj.name = body.name;
        if (body.education) updateObj.education = body.education;
        if (body.place) updateObj.place = body.place;
        // if (body.email) updateObj.email = body.email;
        if (body.phone) updateObj.phone = body.phone;
        if (body.imageUrl) updateObj.imageUrl = body.imageUrl;
    } else {
        return "unauthorized";
    }
}