const socket = io();
const orderId = document.querySelector('.orderId').value;
const userId = document.querySelector('.userId').value;
const messages = document.querySelector('.messages');
const template = document.querySelector('template');

/*
        <li>
            <div class="message-header">
                <span class="date">Date</span>
                <span class="nickname">Nickname</span>
            </div>
            <p>Message</p>
        </li>
*/

function createMessage(data) {
    console.log(data);
    console.log(new Date().toLocaleString())
    let newItem = document.createElement('li');
    newItem.innerHTML = `<div class="message-header">
        <span class="date">${new Date(data.createdAt).toLocaleString()}</span>
        <span class="nickname">${userId === data.sentBy ? 'You' : data.nickname}</span>
    </div>
    <p>${data.message}</p>`.trim();

    return newItem;
}

(function () {
    socket.emit('join', orderId);
    socket.on('message', (data) => messages.appendChild(createMessage(data)));
})();

function send(input) {
    socket.emit('message', {
        message: input.value,
        sentBy: userId,
        order: orderId
    });
    input.value = '';
}