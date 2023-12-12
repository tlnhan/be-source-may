const express = require('express');
const salaryEmployeesController = require('../../../controllers/employee/salary/controller');

const router = express.Router();

router.post('/list', salaryEmployeesController.getSalaryEmployees);
router.post('/data', salaryEmployeesController.insertDataToSalaryEmployees);

module.exports = router;