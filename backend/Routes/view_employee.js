const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const Employee = require('../Schema/employee');
const Manager = require('../Schema/manager');
const router = express.Router();

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.managerId = decoded.managerId;
    next(); 
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

router.get('/employee', verifyToken, async (req, res) => {
  const { managerId } = req;

  try {
    const employees = await Employee.find({ managerId }, { employeeId: 1, name: 1 }); 
    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found for this manager.' });
    }

    // console.log();
    

    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.error('Error:', error.stack);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;