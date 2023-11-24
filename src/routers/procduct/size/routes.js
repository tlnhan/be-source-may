const express = require('express');
const productSizeController = require('../../../controllers/product/size/controller');

const router = express.Router();

router.get('/', productSizeController.getProductSizes);
router.post('/', productSizeController.postProductSize);
router.put('/', productSizeController.putProductSize);
router.delete('/', productSizeController.deleteProductSize);

module.exports = router;