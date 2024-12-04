const express = require('express');
const router = express.Router();
const Task = require('../Schema/taskschema'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const cors = require('cors');

router.get('/view-tasks/', async (req, res) => {
  try {
    // const token = req.headers.authorization.split(' ')[1];
    
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // const { employeeId } = decodedToken;
    // console.log(decodedToken);
    
    // const tasks = await Task.find({employeeId});
    // console.log(tasks);
    const tasks = await Task.find({});
    
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this employee.' });
    }

    res.status(200).json(tasks);
    } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;