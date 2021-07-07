import templateModel from "../../models/template.model";
import domains from "../../utils/domains";
import stripeLib from 'stripe';
import env from '../../utils/env';
import convPrice from '../../utils/price-converter';

let stripe = stripeLib('sk_test_51HTkdqHXIuTmDhIWP9Fb31g4Yzs5fayq76KIddGGKkTf68o1ukvYSqIFXbQs7hMSn5jG8L92nmk1LXaXDwrrhaMW00HAlQDeOd');

async function get(req, res) {
    let template = null;
    let domain = null;

    if (req.session.inventory.template !== null) {
        template = await templateModel.findTemplate({ _id: req.session.inventory.template });
    }

    if (req.session.inventory.domain !== null) {
        domain = await domains.isAvailable(req.session.inventory.domain);
    }

    return res.render('index/checkout', {
        user: req.user,
        domain: {
            ...domain,
            price: Math.round(parseFloat(convPrice(domain.price)))
        },
        template: template,
        tag: req.session.inventory.tag,
        alert: req.consumeAlert()
    });
}

async function post(req, res) {
    const template = await templateModel.findTemplate({ _id: req.session.inventory.template });
    const domain = await domains.isAvailable(req.session.inventory.domain);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: template.price * 100,
                    product_data: {
                        name: template.title,
                        images: template.images,
                    }
                }
            },
            {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: Math.round(parseFloat(convPrice(domain.price))) * 100,
                    product_data: {
                        name: domain.domain,
                        images: ['https://res.cloudinary.com/isak-tech/image/upload/v1625666073/www-purchase.jpg']
                    }
                }
            }
        ],
        mode: 'payment',
        success_url: env.SERVER_URL + '/users/account',
        cancel_url: env.SERVER_URL + '/checkout',
    });

    console.log(session);
    res.redirect(303, session.url);
}

async function success(req, res) {
    let template = null;
    let domain = null;

    if (req.session.inventory.template !== null) {
        template = await templateModel.findTemplate({ _id: req.session.inventory.template });
    }

    if (req.session.inventory.domain !== null) {
        domain = await domains.isAvailable(req.session.inventory.domain);
    }

    return res.render('index/checkout-success', {
        user: req.user,
        domain: {
            ...domain,
            price: parseFloat(convPrice(domain.price))
        },
        template: template
    });
}

export default { get, post, success };