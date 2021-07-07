export function calcPrice(price) {
    let numWithZeroes = (price * 0.000001).toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
    });

    return `${numWithZeroes}`;
}

export function constructItem(data) {
    return {
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: Math.round(data.price) * 100,
            product_data: {
                name: data.title,
                images: data.images
            }
        }
    }
}
