module.exports = (body) => {
    let isValid = true;
    let errors = {};
    if (! body.name ) {
        errors.name = "Name is required";
        isValid = false;
    }
    if (! body.education ) {
        errors.education = "Education is required";
        isValid = false;
    }
    if (! body.place ) {
        errors.place = "Place is required";
        isValid = false;
    }
    if (! body.email ) {
        errors.email = "Email is required";
        isValid = false;
    }
    if (! body.phone ) {
        errors.phone = "Phone is required";
        isValid = false;
    }
    if (! body.password ) {
        errors.password = "Password is required";
        isValid = false;
    }

    return { isValid, errors };
}