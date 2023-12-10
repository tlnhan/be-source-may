const express = require('express');
const updateOutputController = require('../../../controllers/out_put/update_output/controller');

const router = express.Router();

router.get('/', updateOutputController.getUpdateOutputs);
router.post('/employee', updateOutputController.getUpdateOutputEmployee);
router.post('/', updateOutputController.postUpdateOutput);
router.put('/', updateOutputController.putUpdateOutput);
router.delete('/', updateOutputController.deleteUpdateOutput);

module.exports = router;