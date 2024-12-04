const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    ref: 'Employee',
    required: true,
  },
  managerId: {
    type: String,
    ref: 'Manager',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema, 'task');

module.exports = Task;
