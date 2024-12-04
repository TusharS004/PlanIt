require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const routes = require('./routes'); 
const bcrypt = require('bcryptjs');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());  

app.use('/',routes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
