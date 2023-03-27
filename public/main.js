const socket = io();

const nicknameInput = document.getElementById("nicknameInput");
const messages = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const nicknameForm = document.getElementById("nicknameForm");

nicknameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendNickname();
});

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
});

function sendNickname() {
    const nickname = nicknameInput.value;
    if (nickname) {
        socket.emit("nickname", { nickname });
    }
}

let lastMessageTime = 0;

function sendMessage() {
    const message = messageInput.value;
    const currentTime = new Date().getTime();

    if (message && currentTime - lastMessageTime >= 10000) {
        socket.emit("chat message", { message });
        messageInput.value = "";
        lastMessageTime = currentTime;
    } else {
        showMessage("Debes esperar 10 segundos entre cada mensaje.", "text-danger");
    }
}

function loadChatHistory() {
    const chatHistory = localStorage.getItem("chatHistory");
    if (chatHistory) {
        messages.innerHTML = chatHistory;
    }
}

function saveChatHistory() {
    localStorage.setItem("chatHistory", messages.innerHTML);
}

function showWelcomeMessage(nickname) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("text-muted");
    messageElement.innerText = `Bienvenido ${nickname}`;
    messages.appendChild(messageElement);
}

function showMessage(text, className) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(className || "text-muted");
    messageElement.innerText = text;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
    saveChatHistory();
}

socket.on("nickname received", function () {
    showWelcomeMessage(nicknameInput.value);
});

socket.on("chat message", function (data) {
    showMessage(`${data.nickname}: ${data.message}`);
});

// Cargar historial de chat al iniciar la página
loadChatHistory();

const clearChatButton = document.getElementById("clearChatButton");

clearChatButton.addEventListener("click", clearChat);

function clearChat() {
    messages.innerHTML = "";
    localStorage.removeItem("chatHistory");
}