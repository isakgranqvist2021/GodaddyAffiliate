import templateModel from '../../models/template.model';

async function createTemplate(req, res) {
    if (!req.body.title) return res.json({
        message: 'missing title',
        success: false,
        data: null
    });

    if (!req.body.description) return res.json({
        message: 'missing description',
        success: false,
        data: null
    });

    if (!req.body.price || req.body.price <= 0) return res.json({
        message: 'missing price',
        success: false,
        data: null
    });

    if (!req.body.service) return res.json({
        message: 'missing service',
        success: false,
        data: null
    });

    if (!req.body.images || req.body.images.length <= 0) return res.json({
        message: 'missing images',
        success: false,
        data: null
    });

    if (!req.body.removedImages) return res.json({
        message: 'missing removed images',
        success: false,
        data: null
    });

    if (!req.body.tags || req.body.tags.length <= 0) return res.json({
        message: 'missing tags',
        success: false,
        data: null
    });

    if (typeof (req.body.active) !== "boolean") return res.json({
        message: 'missing active',
        success: false,
        data: null
    });

    let data = {
        addedBy: req.user._id,
        tags: req.body.tags.map(tag => tag.toLowerCase()),
        ...req.body
    }

    try {
        const newTemplate = await templateModel.createTemplate(data);
        return res.json({
            message: 'created new template successfully',
            success: true,
            data: newTemplate
        });
    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default createTemplate;