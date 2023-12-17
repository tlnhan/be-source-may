const express = require('express');
const salaryEmployeesController = require('../../../controllers/employee/salary/controller');

const router = express.Router();

router.post('/list', salaryEmployeesController.getSalaryEmployees);
router.post('/data', salaryEmployeesController.insertDataToSalaryEmployees);
router.post('/listbeforecalculatesalary', salaryEmployeesController.getListBeforeCalculatingSalary);

module.exports = router;