import userModel from "../models/user.model";


export function alerts(req, res, next) {
    req.consumeAlert = () => {
        let alert = req.session.alert;
        req.session.alert = undefined;
        return alert;
    }

    return next();
}

export async function user(req, res, next) {
    let user = await userModel.findUser({ _id: req.session.uid });
    req.user = user;
    return next();
}

export function inv(req, res, next) {
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
