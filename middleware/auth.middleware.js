export function loggedIn(req, res, next) {
    if (!req.session.uid)
        return res.redirect('/login');

    return next();
}

export function loggedOut(req, res, next) {
    if (req.session.uid)
        return res.redirect('/users/orders');

    return next();
}
