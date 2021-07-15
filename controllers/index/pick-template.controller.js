import templateModel from "../../models/template.model";

function get(req, res) {
    if (!req.session.inv.tag) {
        req.session.alert = { type: 'error', message: 'please pick a tag before you proceed' };
        return res.redirect('/pick-tag');
    }

    return res.render('index/pick-template', {
        title: 'Pick Template',
        user: req.user
    });
}

async function post(req, res) {
    req.session.inv.temp = await templateModel.findTemplate({ _id: req.body.template });

    return res.redirect('/pick-domain');
}

export default { get, post };