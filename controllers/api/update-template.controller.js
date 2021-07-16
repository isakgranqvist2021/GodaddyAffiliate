import templateModel from "../../models/template.model";

export default async function update(req, res) {
    try {
        await templateModel.updateTemplate({ _id: req.body._id }, {
            ...req.body
        });

        return res.json({
            message: 'updated template',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'update failed',
            success: false,
            data: null
        });
    }
}