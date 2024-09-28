const http = require('http');
const socketIo = require('socket.io');
const Message = require('../models/message'); // Adjust the path if necessary

let userSocketMap = {};

module.exports = (app) => {
  const server = http.createServer(app);
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:4200", // Allow requests from Angular frontend
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('user_connected', (userId) => {
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} connected with socket ID ${socket.id}`);
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of Object.entries(userSocketMap)) {
        if (socketId === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
      console.log('Client disconnected:', socket.id);
    });
  });

  app.set('io', io); // Make the socket.io instance accessible via the app object

  return server;
};
