const express = require('express');
const colorAccordingToProductController = require('../../../controllers/according_to_product/color/controller');

const router = express.Router();

router.post('/getList', colorAccordingToProductController.getColorAccordingToProduct);
router.post('/', colorAccordingToProductController.postColorAccordingToProduct);
router.put('/', colorAccordingToProductController.putColorAccordingToProduct);
router.delete('/', colorAccordingToProductController.deleteColorAccordingToProduct);

module.exports = router;