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
    let newCurrency = currencies.find(c => c.code === req.params.code);

    req.session.currency = newCurrency;

    if (req.session.cart.length > 0) {
        req.session.cart = req.session.cart.map(item => {
            return {
                ...item,
                currency: newCurrency.code,
                price: item.price = item.originalPrice * newCurrency.value
            };
        });
    }

    return res.json({
        message: 'currency updated',
        success: true,
        data: null
    });
}

export default { get, set };