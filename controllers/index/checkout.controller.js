import templateModel from "../../models/template.model";
import domains from "../../utils/domains";

async function get(req, res) {
    let template = null;
    let domain = null;

    if (req.session.inventory.template !== null) {
        template = await templateModel.findTemplate({ _id: req.session.inventory.template });
    }

    if (req.session.inventory.domain !== null) {
        domain = await domains.isAvailable(req.session.inventory.domain);
    }

    return res.render('index/checkout', {
        user: req.user,
        domain: domain,
        template: template,
        tag: req.session.inventory.tag,
        alert: req.consumeAlert()
    });
}

function post(req, res) {

}

export default { get, post };