const express = require('express');

const router = express.Router();

const signup_manager = require('./Routes/signup_manager');
const signup_employee = require('./Routes/signup_employee');
const signin_manager = require('./Routes/signin_manager');
const signin_employee = require('./Routes/signin_employee');
const view_employee = require('./Routes/view_employee');
const assign_task = require('./Routes/assign_task');
const view_task = require('./Routes/view_task');

router.use('/', signup_manager);
router.use('/', signup_employee);
router.use('/', signin_manager);
router.use('/', signin_employee);
router.use('/', view_employee);
router.use('/', assign_task);
router.use('/', view_task);

module.exports = router;