import fs from 'fs';

async function get(req, res) {
    let tags = JSON.parse(fs.readFileSync('./data/tags.json'));

    return res.render('index/pick-tag', {
        title: 'Pick Tag',
        user: req.user,
        alert: req.consumeAlert(),
        tags: tags
    });
}

function post(req, res) {
    req.session.inv.tag = req.body.tag;

    return res.redirect('/pick-template');
}

function set(req, res) {
    let tags = JSON.parse(fs.readFileSync('./data/tags.json'));

    console.log(req.query.tag.toLowerCase());

    if (tags.includes(req.query.tag.toLowerCase())) {
        req.session.inv.tag = req.query.tag;
        return res.redirect('/pick-template');
    }

    return res.redirect(req.headers.referer);
}

export default { get, post, set };