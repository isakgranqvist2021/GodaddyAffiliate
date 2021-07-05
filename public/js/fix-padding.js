(function fixPadding() {
    let nav = document.querySelector('.toolbar');
    let main = document.querySelector('main');

    main.style.paddingTop = nav.getBoundingClientRect().height + 'px';
})();
