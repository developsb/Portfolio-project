const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const checkAdminKey = require('../middleware/checkAdminKey');

// POST a new contact message
router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', data: savedMessage });
  } catch (err) {
    res.status(400).json({ message: 'Invalid message data', error: err.message });
  }
});

// GET all messages (admin use only — not shown publicly on the site)
router.get('/', checkAdminKey, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;