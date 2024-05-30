const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
 const socketIo = require('socket.io');
const { Server } = require('socket.io');
const Task = require('./models/Task');
const taskRoutes = require('./routes/tasks');

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
const cors = require('cors');
app.use(cors());


mongoose.connect('mongodb+srv://saurabhzamare:prjt@cluster0.xkto4qy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  
});
console.log('connected to mongodb');

app.use(express.json());
app.use('/tasks', taskRoutes);

const io = new Server(http, {
    cors: {
      origin: 'http://localhost:5173',
       
       methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      transports: ['websocket'],
      credentials: true,
    },
    allowEIO3: true
  });

  //setting connection
io.on('connection', (socket) => {
  console.log('a user connected');

// task updated event
  socket.on('task updated', (task) => {
    io.emit('task updated', task);
  });

    //task deleted event
  socket.on('task deleted', (taskId) => {
    io.emit('task deleted', taskId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;

//listening to port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
