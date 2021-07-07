function calcPrice(price) {
    let numWithZeroes = (price * 0.000001).toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
    });

    return `${numWithZeroes}`;
}

export default calcPrice;