function get(req, res) {
    if (!req.session.inventory.tag) {
        req.session.alert = { type: 'error', message: 'please pick a tag before you proceed' };
        return res.redirect('/pick-tag');
    }

    return res.render('index/pick-template', {
        user: req.user
    });
}

function post(req, res) {
    req.session.inventory.template = req.body.template;

    return res.redirect('/pick-domain');
}

export default { get, post };