import { constructItem, getPriceDomain, getPriceTemplate } from '../../utils/helpers';

import stripeLib from 'stripe';
import env from '../../utils/env';
import orderModel from '../../models/order.model';

let stripe = stripeLib(env.STRIPE_KEY);

async function get(req, res) {

    return res.render('index/checkout', {
        title: 'Checkout',
        user: req.user,
        cart: req.session.cart,
        cost: Math.round(req.session.cart.reduce((t, i) => {
            return t + i.price;
        }, 0)),
        currency: req.session.currency
    });
}

async function success(req, res) {
    if (!req.session.cid) {
        return res.redirect('/checkout');
    }

    const checkout = await stripe.checkout.sessions.retrieve(req.session.cid);

    const data = {
        belongsTo: req.session.uid,
        cart: req.session.cart,
        cid: checkout.id,
        amount: checkout.amount_total,
        currency: checkout.currency,
        customer: checkout.customer,
        email: checkout.customer_details.email,
        status: checkout.payment_status,
        events: [
            { message: 'Order Received', createdAt: new Date() }
        ]
    }

    try {
        const result = await orderModel.createOrder(data);

        if (result.status !== 'paid') {
            req.session.alert = { type: 'error', message: 'order placement failed' }
            return res.redirect('/checkout');
        }

        req.session.cart = [];

        delete req.session.cid;
        return res.render('index/checkout-success', {
            title: 'Success',
            user: req.user,
        });
    } catch (err) {
        req.session.alert = { type: 'error', message: 'order placement failed' }
        return res.redirect('/checkout');
    }
}

async function post(req, res) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: getPriceTemplate(req.session.inv.temp.price, req.session.currency) * 100,
                title: req.session.inv.temp.title,
                images: req.session.inv.temp.images,
            },
            {
                price: req.session.inv.dom.price * 100,
                title: req.session.inv.dom.domain,
                images: [wwwImage]
            }
        ].map(item => constructItem(item, req.session.currency)),
        mode: 'payment',
        success_url: env.SERVER_URL + '/checkout-success',
        cancel_url: env.SERVER_URL + '/checkout',
    });

    req.session.cid = session.id;
    res.redirect(303, session.url);
}

export default { get, post, success };