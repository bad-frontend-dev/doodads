const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

PORT = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("public/index.html");
});

io.on("connection", (socket) => {
    console.log("socket connected");

    socket.on("run", (code) => {
        console.log(code);
    });
});

httpServer.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
