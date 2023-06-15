import express from "express"
import { Server } from 'socket.io';
import cors from 'cors';

const PORT = "8000"
const app = express();
app.use(cors());

const io = new Server(9000, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST']
  }
})
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