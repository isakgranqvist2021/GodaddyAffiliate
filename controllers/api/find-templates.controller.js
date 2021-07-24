import templateModel from '../../models/template.model';
import { getPriceTemplate } from '../../utils/helpers';

async function findTemplates(req, res) {
    try {
        const templates = await templateModel.findTemplates({
            tags: req.session.tag,
            active: true
        });

        return res.json({
            message: `found ${templates.length} templates`,
            success: true,
            data: templates.map(t => {
                return {
                    ...t,
                    price: getPriceTemplate(t.price, req.session.currency)
                }
            })
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