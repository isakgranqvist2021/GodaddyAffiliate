import { tags } from '../../utils/tags';

async function get(req, res) {
    return res.render('index/pick-tag', {
        user: req.user,
        alert: req.consumeAlert(),
        tags: tags
    });
}

async function post(req, res) {
    req.session.inventory.tag = req.body.tag;

    return res.redirect('/pick-template');
}

export default { get, post };