// Routes/signin_manager.js
const express = require('express');
const router = express.Router();
const Manager = require('../Schema/manager');
const bcrypt = require('bcryptjs');
const cors = require('cors');

router.post('/signin-manager', async (req, res) => {
  const { email, password } = req.body;

 
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
   
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found.' });
    }

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = 'example-token'; 

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;
