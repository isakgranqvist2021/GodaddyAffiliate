import fs from 'fs';

async function get(req, res) {
    let tags = JSON.parse(fs.readFileSync('./data/tags.json'));

    return res.render('index/pick-tag', {
        user: req.user,
        alert: req.consumeAlert(),
        tags: tags
    });
}

async function post(req, res) {
    req.session.inv.tag = req.body.tag;

    return res.redirect('/pick-template');
}

export default { get, post };