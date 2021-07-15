(function () {
    document.querySelector('.checkout-mobile-money')
        .addEventListener('click', checkout);
})();


async function checkout() {
    let body = {};

    const response = await fetch('https://sandbox.momodeveloper.mtn.com/collection/v1_0/bc-authorize?', {
        method: 'POST',
        headers: {
            'Authorization': '',
            'X-Target-Environment': '',
            'X-Callback-Url': '',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Ocp-Apim-Subscription-Key': 'bfd2fca6d85340dfb8a7eaeec69c999c'
        },
        body: JSON.stringify(body)
    })

    const result = await response.json();

    console.log(result);
}