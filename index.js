const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

app.use(express.static("public"));

const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    let nickname = "";
    let lastMessageTime = 0;

    socket.on("nickname", function(data) {
        nickname = data.nickname;
        socket.emit("nickname received");
    });

    socket.on("chat message", function(data) {
        const currentTime = new Date().getTime();

        if (currentTime - lastMessageTime >= 10000) {
            io.emit("chat message", {nickname, message: data.message});
            lastMessageTime = currentTime;
        } else {
            socket.emit("timeout message");
        }
    });
});

httpServer.listen(3000, ()=>
    console.log(`Server listening at http://localhost:3000`)
);
