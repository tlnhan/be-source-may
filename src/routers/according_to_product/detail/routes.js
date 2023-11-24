const express = require('express');
const detailAccordingToProductController = require('../../../controllers/according_to_product/detail/controller');

const router = express.Router();

router.post('/', detailAccordingToProductController.postDetailAccordingToProduct);

module.exports = router;