const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {origin: "*"}
});
const path = require("path");

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/public", express.static("public"));

server.listen(80, () => console.log("Server running..."));

io.on("connection", (socket) => {
	console.log(`New connection ${socket.id}.`);

	socket.on("message", (data) => {
		socket.broadcast.emit("message", data);
		socket.emit("message", data);
	});
});