const express = require('express');
const router = express.Router();
const Manager = require('../Schema/manager'); 
const Employee = require('../Schema/employee'); 
const bcrypt = require('bcryptjs');
const cors = require('cors');

router.post('/signup-employee', async (req, res) => {
    const { name, email, password, retypePassword, managerId,employeeId} = req.body;

    if (!name || !email || !password || !retypePassword || !managerId || !employeeId) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }
  
 
    if (password !== retypePassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }
  
    try {
 
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ message: 'Employee already exists.' });
      }
  

      const duplicateEmployeeId = await Employee.findOne({ employeeId });
      if (duplicateEmployeeId) {
        return res.status(400).json({ message: 'Employee ID already exits.' });
      }
  
      const manager = await Manager.findOne({ managerId });
      if (!manager) {
        return res.status(400).json({ message: 'Manager not found.' });
      }
 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  

      const newEmployee = new Employee({
        name,
        email,
        password: hashedPassword,
        managerId,
        employeeId
      });
  

      await newEmployee.save();
  
      res.status(201).json({ message: 'Employee registered successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  });

  
  module.exports = router;