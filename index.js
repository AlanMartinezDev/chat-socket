const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

app.use(express.static("public"));

const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  
    console.log('Connectat un client...');

    let nickname = "";

    socket.on("nickname", function(data) {
        console.log(data.nickname);
        nickname = data.nickname;
        socket.emit("nickname rebut",{"response":"ok"});
    });

    socket.on("chat message", function(data) {
        io.emit("chat message", {nickname, message: data.message});
    });

});

httpServer.listen(3000, ()=>
    console.log(`Server listening at http://localhost:3000`)
);
