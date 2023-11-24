const express = require('express');
const detailedQuantityTableController = require('../../../controllers/quantity/detailed_quantity_table/controller');

const router = express.Router();

router.post('/', detailedQuantityTableController.postDetailedQuantityTable);
router.put('/', detailedQuantityTableController.putDetailedQuantityTable);

module.exports = router;