import templateModel from '../../models/template.model';

async function findTemplates(req, res) {
    console.log(req.session);

    try {
        const templates = await templateModel.findTemplates({
            tags: req.session.inventory.tag
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