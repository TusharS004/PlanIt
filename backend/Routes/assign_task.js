const express = require('express');
const router = express.Router();
const Task = require('../Schema/taskschema'); 
const Manager = require('../Schema/manager'); 
const Employee = require('../Schema/employee');  
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

router.post('/assign-task', async (req, res) => {
  const { employeeId, title, description, priority, deadline } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1]; 
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    const managerId = decodedToken.managerId; 

    
    if (!employeeId || !managerId || !title || !description || !priority || !deadline) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    
    const validPriorities = ['Low', 'Medium', 'High'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority value.' });
    }

    
    const employee = await Employee.findOne({employeeId});
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    
    const manager = await Manager.findOne({managerId});
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found.' });
    }

    
    const newTask = new Task({
      employeeId,
      managerId,
      title,
      description,
      priority,
      deadline,
    });

    
    await newTask.save();

    res.status(201).json({ message: 'Task assigned successfully!', task: newTask });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;


/*
HEader footer (ui / ux)
log out
sort / filter
edit 
task progress tracker
notfication
mailer
*/