function appendToForm(val) {
    let form = document.getElementById('form');
    let input = document.createElement('input');
    input.setAttribute('name', 'tag');
    input.setAttribute('value', val);
    input.setAttribute('hidden', true);
    form.appendChild(input);
    form.submit();
}