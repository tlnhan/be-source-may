const express = require('express');
const productionAssignmentController = require('../../controllers/production_assignment/controller');

const router = express.Router();

router.get('/', productionAssignmentController.getProductionAssignments);
router.post('/', productionAssignmentController.postProductionAssignment);
router.put('/', productionAssignmentController.putProductionAssignment);
router.delete('/', productionAssignmentController.deleteProductionAssignment);

module.exports = router;