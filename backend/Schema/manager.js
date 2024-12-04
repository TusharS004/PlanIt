// Schema/manager.js
const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
     required: true,
     unique: true
   },
  password: {
     type: String,
     required: true
   },
  managerId: {
     type: String,
     required: true
   },
   role: {
     type: String,
     default: 'manager'
   }
});

const Manager = mongoose.model('Manager', ManagerSchema, 'manager');

module.exports = Manager;