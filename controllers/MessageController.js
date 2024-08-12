const Message = require('../models/Message');

// Create a contact message
exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a new message
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // Sort by most recent
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove a message by ID
exports.removeMessage = async (req, res) => {
  try {
    const { id } = req.body; // Assuming the id is passed as a URL parameter
    const result = await Message.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully!' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
