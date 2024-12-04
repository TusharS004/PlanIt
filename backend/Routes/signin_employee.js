const express = require('express');
const router = express.Router();
const Employee = require('../Schema/employee');
const Manager = require('../Schema/manager');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
  
    const manager = await Manager.findOne({ email });
    if (manager) {
  
      const isMatch = await bcrypt.compare(password, manager.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

  
      const token = jwt.sign(
        { 
  
          role: 'manager',
          managerId: manager.managerId,
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
    
      return res.status(200).json({ 
        message: 'Sign in successful!',
        token,
        role: 'manager'
      });
    }

    const employee = await Employee.findOne({ email });
    if (employee) {
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }


      const token = jwt.sign(
        { 
          role: 'employee',
          employeeId: employee.employeeId 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );

      return res.status(200).json({ 
        message: 'Sign in successful!',
        token,
        role: 'employee'
      });
    }

  
    return res.status(404).json({ message: 'Email not found.' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;