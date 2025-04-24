const socket = io();

document.getElementById("run").addEventListener("click", function () {
    const code = document.getElementById("code").value;

    socket.emit("run", JSON.stringify(code));
});
