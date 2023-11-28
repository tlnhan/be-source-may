const express = require('express');
const sizeAccordingToProductController = require('../../../controllers/according_to_product/size/controller');

const router = express.Router();

router.get('/getList', sizeAccordingToProductController.getSizeAccordingToProduct);
router.post('/', sizeAccordingToProductController.postSizeAccordingToProduct);
router.put('/', sizeAccordingToProductController.putSizeAccordingToProduct);
router.delete('/', sizeAccordingToProductController.deleteSizeAccordingToProduct);

module.exports = router;