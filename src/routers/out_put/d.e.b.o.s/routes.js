const express = require('express');
const displayEmployeesByOutputStatusController = require('../../../controllers/out_put/d.e.b.o.s/controller');

const router = express.Router();

router.get('/', displayEmployeesByOutputStatusController.getDisplayEmployeesByOutputStatus);

module.exports = router;