import domains from '../../utils/domains';
import { getPriceDomain } from '../../utils/helpers';

async function get(req, res) {
    return res.render('index/pick-domain', {
        title: 'Pick Domain',
        user: req.user
    });
}

async function post(req, res) {
    const domain = await domains.isAvailable(req.body.domain);
    req.session.inv.dom = {
        ...domain,
        price: getPriceDomain(domain.price, req.session.currency)
    };

    return res.redirect('/checkout');
}

export default { get, post };

