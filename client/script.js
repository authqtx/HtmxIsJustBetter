// script.js
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
    console.log('Connected to server');
};

socket.onmessage = (event) => {
    const message = event.data;
    const chatMessages = document.getElementById('chat-messages');
    const newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.appendChild(document.createTextNode(` ${message}`));
    chatMessages.appendChild(newMessage);
};

document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        socket.send(message);
        messageInput.value = '';
    }
});

socket.onclose = () => {
    console.log('Disconnected from server');
};

socket.onerror = (error) => {
    console.log('Error occurred:', error);
};