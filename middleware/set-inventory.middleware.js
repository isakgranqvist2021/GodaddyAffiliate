function setInventory(req, res, next) {
    if (req.originalUrl !== '/login' && req.originalUrl !== '/register') {
        req.session.token = null;
    }

    if (!req.session.inv) {
        req.session.inv = {
            tag: null,
            temp: null,
            dom: null
        }
    }

    return next();
}

export default setInventory;