const express = require('express');
const productDetailController = require('../../../controllers/product/detail/controller');

const router = express.Router();

router.get('/', productDetailController.getProductDetails);
router.post('/', productDetailController.postProductDetail);
router.put('/', productDetailController.putProductDetail);
router.delete('/', productDetailController.deleteProductDetail);

module.exports = router;