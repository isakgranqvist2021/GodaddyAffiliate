import userModel from "../models/user.model";
import fs from 'fs';
import path from 'path';

export function alerts(req, res, next) {
    let alert = req.session.alert;
    res.locals.alert = alert;
    delete req.session.alert;
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
    res.locals.styles = styles(req.originalUrl);
    res.locals.scripts = scripts(req.originalUrl);
    res.locals.originalUrl = req.originalUrl;
    return next();
}

export function setCurrency(req, res, next) {
    const currencies = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/currencies.json'))));

    if (!req.session.currency) {
        req.session.currency = currencies[0];
    }

    return next();
}

function styles(path) {
    if (/\/users\/order\/[a-zA-Z0-9]+/.test(path)) {
        return ['/public/css/order.min.css'];
    }

    if (/\/view-template\/[a-zA-Z0-9]+/.test(path)) {
        return ['/public/css/view-template.min.css']
    }

    switch (path) {
        case '/': return ['/public/css/home.min.css'];
        case '/checkout-success': return ['/public/css/checkout-success.min.css'];
        case '/pick-tag': return ['/public/css/tags.min.css'];
        case '/users/orders': return ['/public/css/orders.min.css'];
        case '/admin/orders': return ['/public/css/orders.min.css'];
        case '/admin/view-templates': return ['/public/css/view-templates.min.css'];
        default: return [];
    }
}

function scripts(path) {
    if (/\/users\/order\/[a-zA-Z0-9]+/.test(path)) {
        return [
            '/public/libs/socket.io.js',
            '/public/js/io.js'
        ];
    }

    switch (path) {
        case '/pick-tag': return ['/public/js/appendToForm.js'];
        default: return [];
    }
}