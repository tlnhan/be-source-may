const express = require('express');
const detailAccordingToProductController = require('../../../controllers/according_to_product/detail/controller');

const router = express.Router();

router.post('/getList', detailAccordingToProductController.getDetailAccordingToProduct);
router.post('/', detailAccordingToProductController.postDetailAccordingToProduct);
router.put('/', detailAccordingToProductController.putDetailAccordingToProduct);
router.delete('/', detailAccordingToProductController.deleteDetailAccordingToProduct);

module.exports = router;