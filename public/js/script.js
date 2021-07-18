function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en'
    }, 'google_translate_element');

    document.querySelector('#google_translate_element select').classList.add('form-control');
}