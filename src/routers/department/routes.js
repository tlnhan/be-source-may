const express = require('express');
const departmentController = require('../../controllers/department/controller');

const router = express.Router();

router.get('/', departmentController.getDepartments);
router.post('/', departmentController.postDepartment);
router.put('/', departmentController.putDepartment);
router.delete('/', departmentController.deleteDepartment);

module.exports = router;