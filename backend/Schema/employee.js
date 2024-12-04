const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  managerId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique:true
  },
  role: {
    type: String,
    default: 'employee'
  }
});

const Employee = mongoose.model('Employee', employeeSchema, 'employee');

module.exports = Employee;




