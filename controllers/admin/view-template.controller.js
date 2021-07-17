import templateModel from "../../models/template.model";

async function get(req, res) {
    const template = await templateModel.findTemplate({
        _id: req.params.id
    });

    return res.render('admin/view-template', {
        title: 'Template',
        user: req.user,
        id: template._id,
        staticFiles: req.getStatic('view-template'),
        alert: req.consumeAlert()
    });
}

export default { get };

