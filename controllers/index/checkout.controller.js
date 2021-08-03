import stripeLib from 'stripe';
import env from '../../utils/env';
import orderModel from '../../models/order.model';
import { FedaPay, Transaction } from 'fedapay';
import { serverImg } from '../../utils/helpers';

FedaPay.setApiKey(env.FEDAPAY_API_KEY);
FedaPay.setEnvironment('sandbox');

let stripe = stripeLib(env.STRIPE_KEY);

function remove(req, res) {
    req.session.cart.splice(req.params.index, 1);
    return res.redirect(req.headers.referer);
}

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

async function pay_stripe(req, res) {
    if (!req.session.cart || req.session.cart.length <= 0) {
        req.session.alert = { type: 'error', message: 'please add an item to your cart before checking out' };
        return res.redirect(req.headers.referer);
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: env.SERVER_URL + '/checkout-success',
        cancel_url: env.SERVER_URL + '/checkout',
        line_items: req.session.cart.map(item => {
            return {
                quantity: 1,
                price_data: {
                    currency: req.session.currency.code,
                    unit_amount: Math.round(item.price * 100),
                    product_data: {
                        name: item.title,
                        images: item.images
                    }
                }
            }
        })
    });

    req.session.cid = session.id;
    return res.redirect(303, session.url);
}

async function pay_fedapay(req, res) {
    return res.redirect(req.headers.referer);
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

export default { get, success, remove, pay_stripe, pay_fedapay };