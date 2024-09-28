// routes/message.js

const express = require('express');
const Message = require('../models/message');
const router = express.Router();

// Fetch messages for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId },
        { recipients: userId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
