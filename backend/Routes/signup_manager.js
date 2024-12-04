const express = require('express');
const router = express.Router();
const Manager = require('../Schema/manager'); 
const bcrypt = require('bcryptjs');

const cors = require('cors');

router.post('/signup-manager', async (req, res) => {

    const { name, email, password, retypePassword, managerId } = req.body;

    if (!name || !email || !password || !retypePassword || !managerId) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }
  

    if (password !== retypePassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }
  
    try {
   
      const existingManager = await Manager.findOne({ email });
      if (existingManager) {
        return res.status(400).json({ message: 'Manager already exists.' });
      }
  
      const uniqueMangerId = await Manager.findOne({ managerId });
      if (uniqueMangerId) {
        return res.status(400).json({ message: 'Manager ID already exits.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
 
      const newManager = new Manager({
        name,
        email,
        password: hashedPassword,
        managerId,
      });
  
      await newManager.save();
  
      res.status(201).json({ message: 'Manager registered successfully!' });
    }catch (error) {
      console.error('Error:', error); 
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  });

  module.exports = router;