import domains from '../../utils/domains';

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
        price: Math.round(domain.price * 0.000001)
    };

    return res.redirect('/checkout');
}

export default { get, post };

