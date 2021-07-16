import templateModel from '../../models/template.model';

async function get(req, res) {
    const template = await templateModel.findTemplate({
        _id: req.params.id
    });

    return res.json({
        message: '',
        success: true,
        data: template
    });
}

export default { get };