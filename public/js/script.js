function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en'
    }, 'google_translate_element');

    document.querySelector('#google_translate_element select').classList.add('form-control');
}

(function () {
    let alert = document.querySelector('.alert');
    let span = document.querySelector('.alert span');

    if (alert !== null) {
        span.addEventListener('click', (e) => {
            alert.style.display = 'none';
        });
    }
})();

(function () {
    document.querySelector('.main').style.paddingTop =
        document.querySelector('nav').getBoundingClientRect().height * 1.5 + 'px';
})();

if (window.location.pathname === '/pick-template') {
    (function () {
        document.getElementById('select-tag')
            .addEventListener('change', (e) => {
                document.getElementById('tag-input').value = e.target.value;
                document.getElementById('form').submit();
            });
    })();
}

if (window.location.pathname === '/admin/view-templates') {
    (function () {
        document.querySelectorAll('table tbody tr')
            .forEach(tr => {
                tr.addEventListener('click', (e) => {
                    window.location.href = '/admin/view-template/' + tr.getAttribute('data-id');
                });
            });
    })();
}

if (window.location.pathname === '/users/orders') {
    (function () {
        document.querySelectorAll('table tbody tr')
            .forEach(tr => {
                tr.addEventListener('click', (e) => {
                    window.location.href = '/users/order/' + tr.getAttribute('data-id');
                });
            });
    })();
}

