import domains from '../../utils/domains';


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
        data: data
    });
}

export default { get };