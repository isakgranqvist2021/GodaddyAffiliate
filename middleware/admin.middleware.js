export function isAdmin_v1(req, res, next) {
    if (!req.user.admin) {
        req.session.alert = { type: 'error', message: 'only authorized users can view that page' };
        return res.redirect('/');
    }

    return next();
}

export function isAdmin_v2(req, res, next) {
    if (!req.user || !req.user.admin) {
        return res.json({
            message: 'you must be an administrator to perform that action',
            success: false,
            data: null
        });
    }

    return next();
}
