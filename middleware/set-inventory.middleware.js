function setInventory(req, res, next) {
    if (req.originalUrl !== '/login' && req.originalUrl !== '/register') {
        req.session.token = null;
    }

    if (!req.session.inventory) {
        req.session.inventory = {
            tag: null,
            template: null,
            domain: null
        }
    }

    return next();
}

export default setInventory;