const express = require('express');
const salaryEmployeesController = require('../../../controllers/employee/salary/controller');

const router = express.Router();

router.get('/', salaryEmployeesController.getSalaryEmployees);

module.exports = router;