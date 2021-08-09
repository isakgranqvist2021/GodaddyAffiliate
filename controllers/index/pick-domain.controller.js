import domains from '../../utils/domains';
import { keyImg, getPriceDomain, multiplier } from '../../utils/helpers';

async function get(req, res) {
    return res.render('index/pick-domain', {
        title: 'Pick Domain',
        user: req.user
    });
}

async function post(req, res) {
    const domain = await domains.isAvailable(req.body.domain);

    req.session.cart.push({
        _id: domain.domain,
        images: [keyImg],
        price: getPriceDomain(domain.price, req.session.currency),
        originalPrice: Math.round(domain.price * multiplier * 0.000001),
        currency: req.session.currency.code,
        originalCurrency: 'EUR',
        linkTo: '/pick-domain?q=' + domain.domain,
        type: 'domain',
        title: domain.domain,
        service: domain.domain
    });

    return res.redirect('/checkout');
}

export default { get, post };

