import domains from '../../utils/domains';
import { wwwImage, getPriceDomain, multiplier } from '../../utils/helpers';

async function get(req, res) {
    console.log(req.session);
    return res.render('index/pick-domain', {
        title: 'Pick Domain',
        user: req.user
    });
}

async function post(req, res) {
    const domain = await domains.isAvailable(req.body.domain);

    req.session.cart.push({
        _id: domain.domain,
        images: [wwwImage],
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

