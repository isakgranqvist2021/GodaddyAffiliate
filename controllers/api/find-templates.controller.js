import templateModel from '../../models/template.model';

async function findTemplates(req, res) {
    try {
        const templates = await templateModel.findTemplates({
            tags: req.session.inv.tag
        });

        return res.json({
            message: `found ${templates.length} templates`,
            success: true,
            data: templates
        });

    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default findTemplates;