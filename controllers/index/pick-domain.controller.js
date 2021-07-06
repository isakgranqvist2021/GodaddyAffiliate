async function get(req, res) {
    return res.render('index/pick-domain', {
        user: req.user
    });
}

async function post(req, res) {
    req.session.inventory.domain = req.body.domain;
    return res.redirect('/checkout');
}

export default { get, post };