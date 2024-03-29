import templateModel from "../../models/template.model";

async function get(req, res) {
    const templates = await templateModel.findTemplates({});

    return res.render('admin/view-templates', {
        title: 'Templates',
        user: req.user,
        templates: templates
    });
}

export default { get };

