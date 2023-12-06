const express = require('express');
const productionAssignmentDetailController = require('../../../controllers/production_assignment/detail/controller');

const router = express.Router();

router.post('/', productionAssignmentDetailController.getProductionAssignmentsDetail);

module.exports = router;