const express = require('express');
const customerController = require('../../controllers/customer/controller');

const router = express.Router();

router.get('/', customerController.getCustomers);
router.post('/', customerController.postCustomer);
router.put('/', customerController.putCustomer);
router.delete('/', customerController.deleteCustomer);

module.exports = router;