const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const spawn = require("child_process").spawn;

const child = spawn("python", ["-u", "-i", "-q"]);

child.on("close", (code) => {
    console.log(code);
});

child.stdout.on("data", handleThing);

child.stderr.on("data", handleThing);

function handleThing(data) {
    const output = data.toString("utf8");
    if (output == ">>> ") return;
    console.log(output);
}

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
        // todo: sanitize input
        child.stdin.write(
            code
                .substring(1, code.length - 1)
                .replaceAll('\\"', '"')
                .replaceAll("\\n", ";") + "\n"
        );
    });
});

httpServer.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
