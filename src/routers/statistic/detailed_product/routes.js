const express = require('express');
const detailedProductStatisticController = require('../../../controllers/statiѕtic/detailed_output/controller');

const router = express.Router();

router.post('/', detailedProductStatisticController.getDetailedProductStatistic);

module.exports = router;