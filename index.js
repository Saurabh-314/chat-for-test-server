const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const PORT = process.env.PORT;

app.use(cors());

const server = http.createServer(app);

const io = socketIO(server);
io.on("connection", (socket) => {
  // console.log("connection", socket.id)
  socket.on("join", (data) => {
    console.log("join", data)
    socket.join(data);
  })
  socket.on("send_msg", (data) => {
    console.log('send_msg', data)
    socket.to(data.receiverId).emit("rcv_msg", data)
  })
  socket.on("call", (receiverId) => {
    socket.to(receiverId).emit("call")
  })

})

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`)
})