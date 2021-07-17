(function () {
    let toggleMenu = document.querySelector('.toggle-menu');
    let bars = document.querySelector('.toggle-menu span');
    let sidenav = document.querySelector('.sidenav');
    let filler = document.querySelector('.filler');

    sidenav.addEventListener('click', (e) => {
        if (sidenav.classList.contains('open')) {
            e.stopImmediatePropagation();
        }
    });

    filler.addEventListener('click', () => {
        toggle();
    });

    bars.addEventListener('click', () => toggle());

    const toggle = () => {
        if (sidenav.classList.contains('open')) {
            sidenav.classList.remove('open');
            filler.classList.remove('open');
            toggleMenu.classList.remove('open');
            bars.textContent = 'menu';
        } else {
            sidenav.classList.add('open');
            filler.classList.add('open');
            toggleMenu.classList.add('open');
            bars.textContent = 'close';
        }
    }
})();