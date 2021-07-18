import domains from '../../utils/domains';
import { getPriceDomain } from '../../utils/helpers';


async function get(req, res) {
    let data = {
        domain: null,
        suggestions: null
    };

    data.domain = await domains.isAvailable(req.params.q);
    data.suggestions = await domains.findSuggestions(req.params.q);

    return res.json({
        message: 'found your stuff',
        success: true,
        data: {
            domain: {
                ...data.domain,
                price: getPriceDomain(data.domain.price, req.session.currency)
            },
            suggestions: data.suggestions.map(s => {
                return {
                    ...s,
                    price: getPriceDomain(s.price, req.session.currency)
                }
            })
        }
    });
}

export default { get };