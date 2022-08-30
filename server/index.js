const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        // 이거는 전체 다 보내는 거
        // socket.broadcast.emit('receive_message', data);
        socket.to(data.room).emit('receive_message', data);
    })
})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
});