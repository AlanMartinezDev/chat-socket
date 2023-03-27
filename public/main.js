const socket = io();

const nicknameInput = document.getElementById("nicknameInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const nicknameForm = document.getElementById("nicknameForm");

sendButton.addEventListener("click", (e) => {
    e.preventDefault();
    send();
});

nicknameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    send();
});

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
});

function send() {
    const nickname = nicknameInput.value;
    if (nickname) {
        socket.emit("nickname", { nickname });
    }
}

function sendMessage() {
    const message = messageInput.value;
    if (message) {
        socket.emit("chat message", { message });
        messageInput.value = "";
    }
}

function showWelcomeMessage(nickname) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("text-muted");
    messageElement.innerText = `Bienvenido ${nickname}`;
    messages.appendChild(messageElement);
}

socket.on("nickname rebut", function (data) {
    console.log(data);
    showWelcomeMessage(nicknameInput.value);
});

socket.on("time", function (data) {
    console.log(data);
});

socket.on("chat message", function (data) {
    const messageElement = document.createElement("div");
    messageElement.innerText = `${data.nickname}: ${data.message}`;
    messages.appendChild(messageElement);
});