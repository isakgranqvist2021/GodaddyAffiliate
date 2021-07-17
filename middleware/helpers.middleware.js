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

export function staticFiles(req, res, next) {
    req.getStatic = (path) => ({
        styles: styles(path),
        scripts: scripts(path)
    });

    return next();
}

function styles(path) {
    switch (path) {
        case 'index': return ['/public/css/home.min.css'];
        case 'checkout-success': return ['/public/css/checkout-success.min.css'];
        case 'pick-tag': return ['/public/css/tags.min.css'];
        case 'order': return ['/public/css/order.min.css'];
        case 'orders': return ['/public/css/orders.min.css'];
        case 'view-templates': return ['/public/css/view-templates.min.css'];
        default: return [];
    }
}

function scripts(path) {
    switch (path) {
        case 'pick-tag': return ['/public/js/appendToForm.js'];
        case 'order': return ['https://cdn.socket.io/3.1.3/socket.io.min.js', '/public/js/io.js'];
        default: return [];
    }
}