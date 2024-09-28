const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Route to post a message to multiple users
router.post('/:fromUserId', async (req, res) => {
  const { fromUserId } = req.params;
  const { recipients, message } = req.body;
  const io = req.app.get('io'); // Get the socket.io instance

  console.log('Received POST request:', fromUserId, recipients, message); // Add this line

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).send({ error: 'Recipients should be a non-empty array' });
  }

  try {
    const newMessage = new Message({
      sender: fromUserId,
      recipients: recipients,
      content: message
    });

    await newMessage.save();

    // Emit the message to each recipient
    recipients.forEach((recipientId) => {
      const recipientSocketId = userSocketMap[recipientId];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('message', { from: fromUserId, content: message });
        console.log(`Message sent to socket ID ${recipientSocketId}`);
      }
    });

    res.status(201).send({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to send message' });
  }
});

module.exports = router;
