import { getPriceTemplate } from '../../utils/helpers';
import templateModel from '../../models/template.model';

async function get(req, res) {
    try {
        const template = await templateModel.findTemplate({ _id: req.params.id });

        const simillar = await templateModel.findTemplates({
            _id: { $ne: req.params.id },
            tags: { $in: template.tags }
        });

        if (!template.active) {
            return res.redirect('/pick-template');
        }

        return res.render('index/view-template', {
            title: 'View Template',
            simillar: simillar,
            template: {
                ...template,
                price: getPriceTemplate(template.price, req.session.currency)
            },
            currency: req.session.currency,
            user: req.user,
        });
    } catch (err) {
        return res.redirect('/pick-template');
    }
}

export default { get };