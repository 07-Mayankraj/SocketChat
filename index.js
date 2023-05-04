const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { dbconnection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const auth = require("./middleware/auth.middleware");
const app = express();
const cors = require("cors");
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = process.env.port;

// middleware

app.use(express.json());
app.use(cors());

// routers

app.get("/", (req, res) => res.send(" Hello World "));
app.use("/user", userRouter);

app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/chat.html");
});
// app.use(auth)


// ioconnections
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.broadcast.emit('hi')

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});











httpServer.listen(port, () => {
    try {
        dbconnection;
        console.log("server listening on port " + port);
    } catch (error) {
        console.log({ error: error.message });
    }
});
