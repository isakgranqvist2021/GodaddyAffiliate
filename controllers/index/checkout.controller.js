import stripeLib from 'stripe';
import env from '../../utils/env';

let stripe = stripeLib('sk_test_51HTkdqHXIuTmDhIWP9Fb31g4Yzs5fayq76KIddGGKkTf68o1ukvYSqIFXbQs7hMSn5jG8L92nmk1LXaXDwrrhaMW00HAlQDeOd');
let wwwImage = 'https://res.cloudinary.com/isak-tech/image/upload/v1625666073/www-purchase.jpg';

function constructItem(data) {
    return {
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: Math.round(data.price) * 100,
            product_data: {
                name: data.title,
                images: data.images
            }
        }
    }
}

async function get(req, res) {
    return res.render('index/checkout', {
        user: req.user,
        domain: req.session.inv.dom,
        template: req.session.inv.temp,
        tag: req.session.inv.tag,
        alert: req.consumeAlert()
    });
}

async function post(req, res) {
    const inv = [
        {
            price: req.session.inv.temp.price,
            title: req.session.inv.temp.title,
            images: req.session.inv.temp.images
        },
        {
            price: req.session.inv.dom.price,
            title: req.session.inv.dom.domain,
            images: [wwwImage]
        }
    ]

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: inv.map(item => constructItem(item)),
        mode: 'payment',
        success_url: env.SERVER_URL + '/checkout-success',
        cancel_url: env.SERVER_URL + '/checkout',
    });

    req.session.cid = session.id;
    res.redirect(303, session.url);
}

async function success(req, res) {
    if (!req.session.cid) {
        return res.redirect('/checkout');
    }

    const checkout = await stripe.checkout.sessions.retrieve(req.session.cid);
    console.log(checkout);

    return res.render('index/checkout-success', {
        user: req.user,
        domain: req.session.inv.dom,
        template: req.session.inv.temp
    });
}

export default { get, post, success };