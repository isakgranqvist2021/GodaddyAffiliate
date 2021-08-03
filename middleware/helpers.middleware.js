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

    if (!req.session.cart) {
        req.session.cart = [];
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
        return [
            '/public/css/view-template.min.css',
            '/public/libs/splide.min.css'
        ];
    }

    switch (path) {
        case '/': return ['/public/css/home.min.css'];
        case '/direction': return ['/public/css/direction.min.css'];
        case '/checkout': return ['/public/css/checkout.min.css'];
        case '/checkout-success': return ['/public/css/checkout-success.min.css'];
        case '/pick-tag': return ['/public/css/tags.min.css'];
        case '/users/orders': return ['/public/css/orders.min.css'];
        case '/admin/orders': return ['/public/css/orders.min.css'];
        case '/admin/view-templates': return ['/public/css/view-templates.min.css'];
        case '/talk-to-an-expert': return ['/public/css/hire-expert.min.css'];
        case '/pick-hosting': return ['/public/css/hosting.min.css'];
        case '/build-a-logo': return ['/public/css/hosting.min.css'];
        default: return [];
    }
}

function scripts(path) {
    if (/\/admin\/view-template\/[a-zA-Z0-9]+/.test(path)) {
        return [];
    }

    if (/\/view-template\/[a-zA-Z0-9]+/.test(path)) {
        return [
            '/public/libs/splide.min.js',
            '/public/js/splide.js'
        ];
    }

    switch (path) {
        case '/pick-tag': return ['/public/js/form.js'];
        case '/checkout': return [
            '/public/libs/fedapay.js',
            '/public/js/checkout.js'
        ];
        default: return [];
    }
}