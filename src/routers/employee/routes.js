const express = require('express');
const employeeController = require('../../controllers/employee/controller');

const router = express.Router();

router.get('/', employeeController.getEmployees);
router.post('/', employeeController.postEmployee);
router.put('/', employeeController.putEmployee);
router.delete('/', employeeController.deleteEmployee);

module.exports = router;