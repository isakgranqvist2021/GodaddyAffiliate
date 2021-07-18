import fs from 'fs';
import path from 'path';

async function get(req, res) {
    const currencies = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/currencies.json'))));

    return res.json({
        message: '',
        success: true,
        data: {
            currency: req.session.currency,
            currencies: currencies
        }
    });
}

async function set(req, res) {
    const currencies = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/currencies.json'))));
    req.session.currency = currencies.find(c => c.code === req.params.code);

    return res.json({
        message: 'currency updated',
        success: true,
        data: null
    });
}

export default { get, set };