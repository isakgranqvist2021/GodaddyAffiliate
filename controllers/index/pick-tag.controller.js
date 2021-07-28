import fs from 'fs';
import path from 'path';

async function get(req, res) {
    let tags = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/tags.json'))));

    return res.render('index/pick-tag', {
        title: 'Pick Tag',
        user: req.user,
        tags: tags
    });
}

function post(req, res) {
    let r = req.query.r === 'true' ? true : false;
    req.session.tag = req.body.tag;

    return res.redirect(r ? '/direction' : req.headers.referer);
}

function set(req, res) {
    let tags = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/tags.json'))));

    if (tags.includes(req.query.tag.toLowerCase())) {
        req.session.tag = req.query.tag;
        return res.redirect('/direction');
    }

    return res.redirect(req.headers.referer);
}

export default { get, post, set };
