// server.js

const express = require('express');
const cors = require('cors');
const reminder = require("./Reminder Cron/reminder");
const app = express();
// Middleware
app.use(cors()); // Apply CORS middleware to allow all origins
app.use(express.json());

require("dotenv").config();
require('./Reminder Cron/cronJobs'); // Import and run the cron jobs

const connectDB = require("./config/connectdb");
connectDB();

app.use('/api/users', require('./routes/user'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/contracts', require('./routes/contrat'));
app.use('/api/docs', require('./routes/docs'));
app.use('/api/notif', require('./routes/notification'));
app.use('/api/messages', require('./routes/message'));  // Add this line
app.use('/api/conversation', require('./routes/conversation')); // Add this line

const PORT = process.env.PORT || 7676;

const initializeSocket = require('./middleware/socket');
const server = initializeSocket(app);

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
