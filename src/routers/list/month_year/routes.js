const express = require('express');
const monthAndYearController = require('../../../controllers/list/month_year/controller.js');

const router = express.Router();

router.post('/month', monthAndYearController.getListMonth);
router.post('/year', monthAndYearController.getListYear);

module.exports = router;