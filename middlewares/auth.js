module.exports = (req, res, next) => {
    if (!req.body.accessToken)
        return res.sendStatus(401);
    
    // check if valid token

    // update token if valid

    // add authorization level e.g. to req.params.authLevel
    req.params.authLevel = 1;

    next();
}