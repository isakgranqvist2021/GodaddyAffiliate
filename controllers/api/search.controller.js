import domains from '../../utils/domains';
import { getPrice } from '../../utils/helpers';


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
                price: getPrice(data.domain.price)
            },
            suggestions: data.suggestions.map(s => {
                return {
                    ...s,
                    price: getPrice(s.price)
                }
            })
        }
    });
}

export default { get };